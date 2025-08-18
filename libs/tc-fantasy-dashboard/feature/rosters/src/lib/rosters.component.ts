import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, Subscription, tap } from 'rxjs';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services'; // Replace with the actual path
import { League, Player, Roster } from '@tc-fantasy-dashboard/shared/interfaces';
import { RosterCardComponent } from './roster-card/roster-card.component';
import { LoadingComponent } from '@tc-fantasy-dashboard/shared/components';

@Component({
  selector: 'fd-rosters',
  imports: [CommonModule, RosterCardComponent, LoadingComponent],
  templateUrl: './rosters.component.html'
})
export class RostersComponent implements OnInit, OnDestroy {
  #sub!: Subscription;
  readonly #leagueInitService = inject(LeagueInitService);
  league!: League;
  rosters!: Roster[];
  players!: Record<string, Player>;
  isLoading = true;

  ngOnInit(): void {
    this.#sub = combineLatest([
      this.#leagueInitService.selectedLeague$,
      this.#leagueInitService.playersLoading$
    ])
      .pipe(
        tap(([selectedLeague, loading]) => {
          this.isLoading = loading;
          this.league = selectedLeague;
          const rosterKeys = Object.keys(selectedLeague.rosters ?? {})
          if (!rosterKeys.length) {
            return;
          }
          this.rosters = rosterKeys.map(rosterId => selectedLeague.rosters?.[+rosterId] as Roster);
          this.players = selectedLeague.players ?? {};
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }
}
