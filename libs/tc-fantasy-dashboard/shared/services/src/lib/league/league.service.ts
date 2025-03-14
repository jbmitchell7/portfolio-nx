import { Injectable } from '@angular/core';
import { League } from '@tc-fantasy-dashboard/shared/interfaces';
import { BehaviorSubject, catchError, Observable, of, take, tap } from 'rxjs';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService extends DataService {
  readonly #leagues = new BehaviorSubject<Record<string, League>>({});
  readonly #selectedLeague = new BehaviorSubject<string>('');

  get selectedLeague$(): Observable<string> {
    return this.#selectedLeague.asObservable();
  }

  setLeagueState(league: Record<string, League>): void {
    this.#leagues.next(league);
  }

  setSelectedLeagueState(leagueId: string): void {
    this.#selectedLeague.next(leagueId);
  }

  getLeague(leagueId: string): void {
    if (this.#leagues.value[leagueId]) {
      this.setSelectedLeagueState(leagueId);
      return;
    }
    this.setLoadingState(true);
    this.sleeperApiService
      .getLeague(leagueId)
      .pipe(
        take(1),
        tap((league) => this.getSportState(league)),
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Cannot fetch league data. Please try again later or try another id.' 
          });
          this.#resetLeagueState();
          return of(null);
        })
      ).subscribe();
  }

  getSportState(league: League): void {
    this.sleeperApiService
      .getSportState(league.sport)
      .pipe(
        take(1),
        tap((sportState) => {
          localStorage.setItem('LEAGUE_ID', league.league_id);
          this.setLeagueState({
            ...this.#leagues.value,
            [league.league_id]: {
              ...league,
              sportState
            }
          });
          this.setSelectedLeagueState(league.league_id);
          this.setLoadingState(false);
        }),
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Cannot fetch sport state data. Please try again later.'
          });
          this.#resetLeagueState();
          return of(null);
        })
      ).subscribe();
  }

  #resetLeagueState(): void {
    this.setLeagueState({});
    this.setSelectedLeagueState('');
    this.setLoadingState(false);
  }
}
