import { inject, Injectable } from '@angular/core';
import {
  Draft,
  League,
  LeagueResponse,
  Manager,
  Roster,
  Transaction,
} from '@tc-fantasy-dashboard/shared/interfaces';
import { BehaviorSubject, catchError, forkJoin, Observable, of, switchMap, take, tap } from 'rxjs';
import { FantasyDashboardApiService } from '../api-fantasy-dashboard/fantasy-dashboard-api.service';
import { MessageService } from 'primeng/api';
import { SleeperApiService } from '../api-sleeper/sleeper-api.service';
import { getCurrentTransactionsWeek } from '@tc-fantasy-dashboard/shared/utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LeagueInitService {
  readonly #fantasyDashboardApiService = inject(FantasyDashboardApiService);
  readonly #messageService = inject(MessageService);
  readonly #sleeperApiService = inject(SleeperApiService);
  readonly #router = inject(Router);

  readonly #selectedLeague = new BehaviorSubject<League>({} as League);
  readonly #isLoading = new BehaviorSubject<boolean>(false);
  readonly #playersLoading = new BehaviorSubject<boolean>(false);
  #leagues: Record<string, League> = {};

  get isLoading$(): Observable<boolean> {
    return this.#isLoading.asObservable();
  }

  get playersLoading$(): Observable<boolean> {
    return this.#playersLoading.asObservable();
  }

  get selectedLeague$(): Observable<League> {
    return this.#selectedLeague.asObservable();
  }

  resetLeagueState(): void {
    localStorage.setItem('CURRENT_LEAGUE_ID', '');
    this.#setSelectedLeague({} as League);
    this.#leagues = {};
    this.#setLoadingState(false);
    this.#setPlayersLoadingState(false);
    this.#router.navigateByUrl('/welcome');
  }

  initLeague(leagueId: string): void {
    this.#setLoadingState(true);
    if (this.#leagues[leagueId]) {
      this.#selectedLeague.next(this.#leagues[leagueId]);
      localStorage.setItem('CURRENT_LEAGUE_ID', leagueId);
      this.#setLoadingState(false);
      return;
    }
    this.#sleeperApiService
      .getLeague(leagueId)
      .pipe(
        take(1),
        switchMap((league: LeagueResponse) => (
          forkJoin([
            of(league),
            this.#sleeperApiService.getSportState(league.sport)
          ])
        )),
        tap(res => {
          const league = res[0];
          const sportState = res[1];
          const leagueWithState = {
            ...league,
            sportState
          };
          this.#getLeagueData(leagueWithState);
        }),
        catchError(() => {
          this.#messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'Cannot fetch league data. Please try again later or try another id.',
          });
          this.resetLeagueState();
          return of(null);
        })
      )
      .subscribe();
  }

  getTransactions(league: League, week: number): void {
    this.#setLoadingState(true);
    this.#sleeperApiService
      .getTransactions(league.league_id, week)
      .pipe(
        take(1),
        tap((transactions) => {
          const updatedLeague = {
            ...league,
            transactions: {
              ...league.transactions,
              [week]: transactions,
            },
          };
          this.#setSelectedLeague(updatedLeague);
          this.#setLoadingState(false);
        }),
        catchError(() => {
          this.#messageService.add({
            severity: 'warning',
            summary: 'Error',
            detail: 'Cannot fetch transactions. Please try again later.',
          });
          this.resetLeagueState();
          return of(null);
        })
      )
      .subscribe();
  }

  getPlayers(playerIds: string[], sport: string, league: League): void {
    this.#playersLoading.next(true);
    if (league.players?.[playerIds[0]]) {
      this.#setPlayersLoadingState(false);
      return;
    }
    this.#fantasyDashboardApiService
      .getPlayers(sport, playerIds)
      .pipe(
        take(1),
        tap((players: any) => {
          const playerRecords = this.#createRecords(players, 'player_id');
          const updatedLeague = {
            ...league,
            players: {
              ...league.players,
              ...playerRecords,
            },
          };
          this.#setSelectedLeague(updatedLeague);
          this.#setPlayersLoadingState(false);
        }),
        catchError(() => {
          this.#messageService.add({
            severity: 'warning',
            summary: 'Error',
            detail: 'Cannot fetch players. Please try again later.',
          });
          this.#setPlayersLoadingState(false);
          return of(null);
        })
      )
      .subscribe();
  }

  #setLoadingState(isLoading: boolean): void {
    this.#isLoading.next(isLoading);
  }

  #setPlayersLoadingState(loading: boolean): void {
    this.#playersLoading.next(loading);
  }

  #setSelectedLeague(league: League): void {
    this.#leagues[league.league_id] = league;
    this.#selectedLeague.next(league);
  }

  #getLeagueData(league: League): void {
    const leagueId = league.league_id;
    const transactionsWeek = getCurrentTransactionsWeek(league);
    const apiCalls = [
      this.#sleeperApiService.getManagers(leagueId),
      this.#sleeperApiService.getRosters(leagueId),
      this.#sleeperApiService.getTransactions(leagueId, transactionsWeek),
      this.#sleeperApiService.getDraft(league.draft_id)
    ];
    forkJoin(apiCalls)
      .pipe(
        take(1),
        tap(res => {
          localStorage.setItem('CURRENT_LEAGUE_ID', league.league_id);

          const managersRes: Manager[] = res[0] as Manager[];
          const managersWithAvatars = this.#getManagerAvatars(managersRes);
          const managerRecords = this.#createRecords(
            managersWithAvatars,
            'user_id'
          );

          const rostersRes: Roster[] = res[1] as Roster[];
          const rosterRecords = this.#createRecords(rostersRes, 'owner_id');

          const transactions: Transaction[] = res[2] as Transaction[];
          const draft: Draft = res[3] as Draft;

          const updatedLeague: League = {
            ...league,
            currentSeason: league.season === league.sportState.season,
            managers: managerRecords,
            rosters: rosterRecords,
            transactions: {
              [transactionsWeek]: transactions,
            },
            draft
          };
          this.#setSelectedLeague(updatedLeague);
          this.#setLoadingState(false);

          const ids = rostersRes.map((r) => r.players).flat();
          this.getPlayers(ids, league.sport, updatedLeague);
        }),
        catchError(() => {
          this.#messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'Cannot fetch roster data. Please try again later or try another id.',
          });
          this.resetLeagueState();
          return of(null);
        })
      )
      .subscribe();
  }

  #getManagerAvatars(managers: Manager[]): Manager[] {
    const avatarUrl = 'https://sleepercdn.com/avatars/thumbs';
    const defaultAvatar = '4f4090e5e9c3941414db40a871e3e909';
    return managers.map((p) => ({
      ...p,
      avatarUrl: `${avatarUrl}/${p.avatar ?? defaultAvatar}`,
      id: p.user_id,
    }));
  }

  #createRecords(data: any[], key: string): Record<string, any> {
    return data.reduce((acc, item) => {
      acc[item[key]] = item;
      return acc;
    }, {} as Record<string, any>);
  }
}
