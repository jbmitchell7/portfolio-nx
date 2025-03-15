import { Component, inject, OnDestroy } from '@angular/core';
import { GraphComponent } from '../../../components/graph/graph.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { WeeklyTransactionsComponent } from '../../../components/weekly-transactions/weekly-transactions.component';
import { TITLE_TEXT } from '../../../components/graph/graph.constants';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {
  StandingsData,
  SportState,
  League,
  Transaction,
  Roster,
  RosterMove,
  Player,
} from '@tc-fantasy-dashboard/shared/interfaces';
import { getCurrentTransactionsWeek, getRosterMoves } from '@tc-fantasy-dashboard/shared/utils';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';

@Component({
  selector: 'fd-home',
  imports: [
    CommonModule,
    GraphComponent,
    PanelModule,
    WeeklyTransactionsComponent,
    ProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnDestroy {
  readonly #leagueInitService = inject(LeagueInitService);
  #leagueSub!: Subscription;

  standingsData!: StandingsData[];
  sportState?: SportState;
  league!: League;
  rosters?: Record<string, Roster>;
  pageHeader!: string;
  weekTitle!: string;
  weekNumber!: number;
  transactions: Transaction[] = [];
  transactionsLoading = true;
  graphHeader = TITLE_TEXT;

  constructor() {
    this.#initLeagueSub();
  }

  ngOnDestroy(): void {
    this.#leagueSub.unsubscribe();
  }

  #initLeagueSub(): void {
    this.#leagueSub = this.#leagueInitService.leagues$.subscribe((leagues) => {
      const leagueId = localStorage.getItem('CURRENT_LEAGUE_ID');
      this.league = leagues[leagueId as string];
      this.rosters = this.league.rosters;
      this.sportState = this.league.sportState;
      this.weekNumber = getCurrentTransactionsWeek(this.league);
      this.pageHeader = this.#getPageHeader();
      this.transactions =
      this.league.transactions?.[this.weekNumber] ?? ([] as Transaction[]);
      this.#getMissingPlayers();
    });
  }

  #getPageHeader(): string {
    const opening = `${this.league.sport.toUpperCase()} ${this.league.season}`;
    if (
      this.league.status === 'complete' ||
      this.league.status === 'pre_draft'
    ) {
      return `${opening} Offseason`;
    } else {
      return `${opening} Week ${this.weekNumber}`;
    }
  }

  #getMissingPlayers(): void {
    const missingPlayers: string[] = [];
    // TODO: need to add logic for generating roster moves here or to transaction component
    this.transactions.forEach((t) => {
      const rosterMoves = getRosterMoves(t, this.league);
      rosterMoves?.forEach((m: RosterMove) => {
        m.adds?.forEach((a: Partial<Player>) => {
          if (!a.full_name) {
            missingPlayers.push(a.player_id as string);
          }
        });
        m.drops?.forEach((a: Partial<Player>) => {
          if (!a.full_name) {
            missingPlayers.push(a.player_id as string);
          }
        });
      });
    });
    if (missingPlayers.length) {
      this.#leagueInitService.getPlayers(
        missingPlayers,
        this.league.sport,
        this.league.league_id
      );
    }
  }
}
