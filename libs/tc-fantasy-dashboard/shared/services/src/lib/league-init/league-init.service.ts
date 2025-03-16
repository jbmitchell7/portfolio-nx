import { inject, Injectable } from '@angular/core';
import {
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

@Injectable({
  providedIn: 'root',
})
export class LeagueInitService {
  readonly #fantasyDashboardApiService = inject(FantasyDashboardApiService);
  readonly #messageService = inject(MessageService);
  readonly #sleeperApiService = inject(SleeperApiService);

  readonly #leagues = new BehaviorSubject<Record<string, League>>({});
  readonly #isLoading = new BehaviorSubject<boolean>(false);
  readonly #playersLoading = new BehaviorSubject<boolean>(false);

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

  get leagues$(): Observable<Record<string, League>> {
    return this.#leagues.asObservable();
  }

  setLeagueState(league: Record<string, League>): void {
    this.#leagues.next(league);
  }

  resetLeagueState(): void {
    this.setLeagueState({});
    this.setLoadingState(false);
  }

  initLeague(leagueId: string): void {
    if (this.#leagues.value[leagueId]) {
      localStorage.setItem('CURRENT_LEAGUE_ID', leagueId);
      return;
    }
    this.setLoadingState(true);
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
          const leagueData: League = {
            ...league,
            sportState,
          };
          this.#getManagers(leagueData);
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
          const leagueData: League = {
            ...league,
            managers: managerRecords,
          };
          this.#getTransactions(leagueData);
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
          const leagueData = {
            ...league,
            transactions: {
              ...league.transactions,
              [transactionsWeek]: transactions,
            },
          };
          this.#getRosters(leagueData);
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

  #getRosters(league: League): void {
    this.#sleeperApiService
      .getRosters(league.league_id)
      .pipe(
        take(1),
        tap((rosters: Roster[]) => {
          const rosterRecords = this.#createRecords(rosters, 'owner_id');
          const leagueData: League = {
            ...league,
            rosters: rosterRecords,
          };
          this.setLeagueState({
            ...this.#leagues.value,
            [league.league_id]: leagueData,
          });
          const ids = rosters.map((r) => r.players).flat();
          this.getPlayers(ids, league.sport, league.league_id);
          this.setLoadingState(false);
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

  getPlayers(playerIds: string[], sport: string, leagueId: string): void {
    this.#playersLoading.next(true);
    if (this.#leagues.value[leagueId].players?.[playerIds[0]]) {
      this.setPlayersLoadingState(false);
      return;
    }
    this.#fantasyDashboardApiService
      .getPlayers(sport, playerIds)
      .pipe(
        take(1),
        tap((players: any) => {
          const playerRecords = this.#createRecords(players, 'player_id');
          const leagueData: League = {
            ...this.#leagues.value[leagueId],
            players: {
              ...this.#leagues.value[leagueId].players,
              ...playerRecords,
            },
          };
          this.setLeagueState({
            ...this.#leagues.value,
            [leagueId]: leagueData,
          });
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
