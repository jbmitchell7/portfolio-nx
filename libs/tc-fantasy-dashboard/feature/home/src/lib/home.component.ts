import { Component, inject, OnDestroy } from '@angular/core';
import { PowerRankingsGraphComponent } from './power-ranking-graph/power-rankings-graph.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { WeeklyTransactionsComponent } from './weekly-transactions/weekly-transactions.component';
import { TITLE_TEXT } from './power-ranking-graph/power-rankings-graph.constants';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {
  StandingsData,
  SportState,
  League,
  Roster,
  RosterMove,
} from '@tc-fantasy-dashboard/shared/interfaces';
import {
  getCurrentTransactionsWeek,
  getStandingsData,
} from '@tc-fantasy-dashboard/shared/utils';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { LeagueChampionComponent } from "./league-champion/league-champion.component";

@Component({
  selector: 'fd-home',
  imports: [
    CommonModule,
    PowerRankingsGraphComponent,
    PanelModule,
    WeeklyTransactionsComponent,
    ProgressSpinnerModule,
    LeagueChampionComponent
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
  rosterMoves: RosterMove[][] = [];
  graphHeader = TITLE_TEXT;

  constructor() {
    this.#initLeagueSub();
  }

  ngOnDestroy(): void {
    this.#leagueSub.unsubscribe();
  }

  #initLeagueSub(): void {
    this.#leagueSub = this.#leagueInitService.selectedLeague$
      .subscribe(league => {
        this.league = league;
        this.standingsData = getStandingsData(this.league);
        this.rosters = this.league.rosters;
        this.sportState = this.league.sportState;
        this.weekNumber = getCurrentTransactionsWeek(this.league);
        this.pageHeader = this.#getPageHeader();
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
}
