import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, take, tap } from 'rxjs';
import { DataService } from '../data/data.service';
import { Player, Roster } from '@tc-fantasy-dashboard/shared/interfaces';
import { FantasyDashboardApiService } from '../api-fantasy-dashboard/fantasy-dashboard-api.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends DataService {
  readonly #fantasyDashboardApiService = inject(FantasyDashboardApiService);
  #players = new BehaviorSubject<Record<string, Player>>({});

  get players$(): Observable<Record<string, Player>> {
    return this.#players.asObservable();
  }

  setPlayersState(players: Record<string, Player>): void {
    this.#players.next(players);
  }

  getPlayers(rosters: Roster[], sport: string): void {
    this.setLoadingState(true);
    const ids = rosters.map((roster) => roster.players).flat();
    this.#fantasyDashboardApiService
      .getPlayers(sport, ids)
      .pipe(
        take(1),
        tap((players: unknown) => {
          const playerRecords = this.#createPlayerRecords(players as Player[]);
          this.setPlayersState(playerRecords);
          this.setLoadingState(false);
        }),
        catchError(() => {
          this.messageService.add({
            severity: 'warning',
            summary: 'Error',
            detail: 'Cannot fetch players. Please try again later.'
          });
          this.setPlayersState({});
          this.setLoadingState(false);
          return of(null);
        })
      ).subscribe();
  }

  #createPlayerRecords(players: Player[]): Record<string, Player> {
    return players.reduce((acc: Record<string, Player>, player: Player) => {
      acc[player.player_id] = player;
      return acc;
    }, {});
  }
}