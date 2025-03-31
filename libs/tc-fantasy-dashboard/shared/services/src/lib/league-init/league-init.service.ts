import { inject, Injectable } from '@angular/core';
import {
  Draft,
  League,
  LeagueResponse,
  Manager,
  Roster,
} from '@tc-fantasy-dashboard/shared/interfaces';
import { BehaviorSubject, catchError, Observable, of, take, tap } from 'rxjs';
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

  setLoadingState(isLoading: boolean): void {
    this.#isLoading.next(isLoading);
  }

  get playersLoading$(): Observable<boolean> {
    return this.#playersLoading.asObservable();
  }

  setPlayersLoadingState(loading: boolean): void {
    this.#playersLoading.next(loading);
  }

  get selectedLeague$(): Observable<League> {
    return this.#selectedLeague.asObservable();
  }

  setSelectedLeague(league: League): void {
    this.#leagues[league.league_id] = league;
    this.#selectedLeague.next(league);
  }

  resetLeagueState(): void {
    localStorage.setItem('CURRENT_LEAGUE_ID', '');
    this.setSelectedLeague({} as League);
    this.#leagues = {};
    this.setLoadingState(false);
    this.setPlayersLoadingState(false);
    this.#router.navigateByUrl('/welcome');
  }

  initLeague(leagueId: string): void {
    this.setLoadingState(true);
    if (this.#leagues[leagueId]) {
      this.#selectedLeague.next(this.#leagues[leagueId]);
      localStorage.setItem('CURRENT_LEAGUE_ID', leagueId);
      this.setLoadingState(false);
      return;
    }
    this.#sleeperApiService
      .getLeague(leagueId)
      .pipe(
        take(1),
        tap((league) => this.#getSportState(league)),
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

  #getSportState(league: LeagueResponse): void {
    this.#sleeperApiService
      .getSportState(league.sport)
      .pipe(
        take(1),
        tap((sportState) => {
          localStorage.setItem('CURRENT_LEAGUE_ID', league.league_id);
          const updatedLeague: League = {
            ...league,
            sportState,
            currentSeason: league.season === sportState.season
          };
          this.#getManagers(updatedLeague);
        }),
        catchError(() => {
          this.#messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Cannot fetch sport state data. Please try again later.',
          });
          this.resetLeagueState();
          return of(null);
        })
      )
      .subscribe();
  }

  #getManagers(league: League): void {
    this.#sleeperApiService
      .getManagers(league.league_id)
      .pipe(
        take(1),
        tap((managers) => {
          const managersWithAvatars = this.#getManagerAvatars(managers);
          const managerRecords = this.#createRecords(
            managersWithAvatars,
            'user_id'
          );
          const updatedLeague: League = {
            ...league,
            managers: managerRecords,
          };
          this.#getTransactions(updatedLeague);
        }),
        catchError(() => {
          this.#messageService.add({
            severity: 'warning',
            summary: 'Error',
            detail: 'Cannot fetch managers. Please try again later.',
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

  #getTransactions(league: League): void {
    if (!league.sportState) {
      return;
    }
    const transactionsWeek = getCurrentTransactionsWeek(league);
    this.#sleeperApiService
      .getTransactions(league.league_id, transactionsWeek)
      .pipe(
        take(1),
        tap((transactions) => {
          if (!league.sportState) {
            return;
          }
          const updatedLeague = {
            ...league,
            transactions: {
              ...league.transactions,
              [transactionsWeek]: transactions,
            },
          };
          this.#getDraft(updatedLeague);
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

  #getDraft(league: League): void {
    this.#sleeperApiService
    .getDraft(league.draft_id)
      .pipe(
        take(1),
        tap((draft: Draft) => {
          const updatedLeague: League = {
            ...league,
            draft
          };
          this.#getRosters(updatedLeague);
        }),
        catchError(() => {
          this.#messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Cannot fetch draft data. Please try again later.',
          });
          this.resetLeagueState();
          return of(null);
        })
      )
      .subscribe();
  }

  #getRosters(league: League): void {
    this.#sleeperApiService
      .getRosters(league.league_id)
      .pipe(
        take(1),
        tap((rosters: Roster[]) => {
          const rosterRecords = this.#createRecords(rosters, 'owner_id');
          const updatedLeague: League = {
            ...league,
            rosters: rosterRecords,
          };
          this.setSelectedLeague(updatedLeague);
          this.setLoadingState(false);

          const ids = rosters.map((r) => r.players).flat();
          this.getPlayers(ids, league.sport, updatedLeague);
        }),
        catchError(() => {
          this.#messageService.add({
            severity: 'warning',
            summary: 'Error',
            detail: 'Cannot fetch rosters. Please try again later.',
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
      this.setPlayersLoadingState(false);
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
          this.setSelectedLeague(updatedLeague);
          this.setPlayersLoadingState(false);
        }),
        catchError(() => {
          this.#messageService.add({
            severity: 'warning',
            summary: 'Error',
            detail: 'Cannot fetch players. Please try again later.',
          });
          this.setPlayersLoadingState(false);
          return of(null);
        })
      )
      .subscribe();
  }

  #createRecords(data: any[], key: string): Record<string, any> {
    return data.reduce((acc, item) => {
      acc[item[key]] = item;
      return acc;
    }, {} as Record<string, any>);
  }
}
