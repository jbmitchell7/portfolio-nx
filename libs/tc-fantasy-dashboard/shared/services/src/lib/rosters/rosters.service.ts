import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service'; // Adjust the path as necessary
import { BehaviorSubject, catchError, Observable, of, take, tap } from 'rxjs';
import { Roster } from '@tc-fantasy-dashboard/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RosterService extends DataService {
  #rosters = new BehaviorSubject<Record<string, Roster> | null>(null);
  
  get rosters$(): Observable<Record<string, Roster> | null> {
    return this.#rosters.asObservable();
  }

  setRosterState(rosters: Record<string, Roster> | null): void {
    this.#rosters.next(rosters);
  }

  getRosters(leagueId: string) {
    this.sleeperApiService
      .getRosters(leagueId)
      .pipe(
        take(1),
        tap((rosters) => {
          const rosterRecords = this.#createRosterRecords(rosters);
          this.setRosterState(rosterRecords);
          this.setLoadingState(false);
        }),
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Cannot fetch rosters data. Please try again later or try another id.'
          });
          this.setRosterState(null);
          this.setLoadingState(false);
          return of(null);
        })
      ).subscribe();
  }

  #createRosterRecords(rosters: Roster[]): Record<string, Roster> {
    return rosters.reduce((acc: Record<string, Roster>, roster: Roster) => {
      acc[roster.owner_id] = roster;
      return acc;
    }, {});
  }
}