import { Injectable } from '@angular/core';
import { League } from '@tc-fantasy-dashboard/shared/interfaces';
import { BehaviorSubject, catchError, Observable, of, take, tap } from 'rxjs';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService extends DataService {
  readonly #league = new BehaviorSubject<League | null>(null);

  get league$(): Observable<League | null> {
    return this.#league.asObservable();
  }

  setLeagueState(league: League | null): void {
    this.#league.next(league);
  }

  getLeague(leagueId: string): void {
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
          this.setLeagueState(null);
          this.setLoadingState(false);
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
            ...league,
            sportState
          });
          this.setLoadingState(false);
        }),
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Cannot fetch sport state data. Please try again later.'
          });
          return of(null);
        })
      ).subscribe();
  }
}
