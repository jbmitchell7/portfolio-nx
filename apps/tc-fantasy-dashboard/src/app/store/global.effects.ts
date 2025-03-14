import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { getLeagueSuccess, getLeagueFailure } from './league/league.actions';
import {
  getRostersSuccess,
  getRostersFailure
} from './rosters/rosters.actions';
import { getSportStateFailure, getSportStateSuccess, leagueEntryRequest } from './global.actions';
import { getManagersSuccess } from './managers/managers.actions';
import { Router } from '@angular/router';
import { getTransactionsFailure, getTransactionsRequest, getTransactionsSuccess } from './transactions/transactions.actions';
import { getPlayersRequest, getPlayersSuccess, getPlayersFailure } from './players/players.actions';
import { FantasyDashboardApiService, SleeperApiService } from '@tc-fantasy-dashboard/shared/services';
import { League, Manager, Roster, SportState } from '@tc-fantasy-dashboard/shared/interfaces';

@Injectable()
export class GlobalEffects {
  readonly #actions$ = inject(Actions);
  readonly #sleeperApi = inject(SleeperApiService);
  readonly #router = inject(Router);
  readonly #fantasyFocusApi = inject(FantasyDashboardApiService);

  getLeague$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(leagueEntryRequest),
      switchMap((props) =>
        this.#sleeperApi.getLeague(props.leagueId).pipe(
          map((res: League) => getLeagueSuccess({ league: res })),
          catchError(() => {
            this.#router.navigateByUrl('/welcome');
            return of(getLeagueFailure({ error: 'error getting league data' }))
          })
        )
      )
    )
  );

  getSportState$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getLeagueSuccess),
      switchMap(props =>
        this.#sleeperApi.getSportState(props.league.sport).pipe(
          map((sport: SportState) => {
            localStorage.setItem('LEAGUE_ID', props.league.league_id);
            return getSportStateSuccess({sport});
          }),
          catchError((error) => {
            this.#router.navigateByUrl('/welcome');
            return of(getSportStateFailure({error}));
          })
        )
      )
    )
  );

  getRosters$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getLeagueSuccess),
      switchMap((props) =>
        this.#sleeperApi
          .getRosters(props.league.league_id)
          .pipe(
            map((res: Roster[]) => getRostersSuccess({ rosters: res, sport: props.league.sport})),
            catchError(() =>
              of(getRostersFailure({ error: 'error getting roster data' }))
            )
          )
      )
    )
  );

  getManagers$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(leagueEntryRequest),
      switchMap((props) =>
        this.#sleeperApi
          .getManagers(props.leagueId)
          .pipe(
            map((res: Manager[]) => getManagersSuccess({ players: res })),
            catchError(() =>
              of(getRostersFailure({ error: 'error getting roster data' }))
            )
          )
      )
    )
  );

  getPlayers$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getRostersSuccess),
      map(props => {
        const ids = props.rosters.map(r => r.players).flat();
        return getPlayersRequest({sport: props.sport, ids});
      })
    )
  );

  getPlayersData$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getPlayersRequest),
      switchMap((props) =>
        this.#fantasyFocusApi.getPlayers(`players/${props.sport}`, props.ids)
          .pipe(
            map((res: any) => getPlayersSuccess({ players: res })),
            catchError(() =>
              of(getPlayersFailure({ error: 'error getting roster data' }))
            )
          )
      )
    )
  );

  getTransactions$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getTransactionsRequest),
      switchMap(({leagueId, week}) =>
        this.#sleeperApi.getTransactions(leagueId, week)
          .pipe(
            map(transactions => getTransactionsSuccess({week, transactions})),
            catchError(() =>
              of(getTransactionsFailure({error: 'error getting transactions'}))
            )
          )
      )
    )
  );
}
