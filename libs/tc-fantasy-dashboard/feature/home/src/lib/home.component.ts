import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PowerRankingsGraphComponent } from './power-ranking-graph/power-rankings-graph.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { WeeklyTransactionsComponent } from './weekly-transactions/weekly-transactions.component';
import { TITLE_TEXT } from './power-ranking-graph/power-rankings-graph.constants';
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
import { DraftOrderComponent } from "./draft-order/draft-order.component";
import { LoadingComponent } from '@tc-fantasy-dashboard/shared/components';

@Component({
  selector: 'fd-home',
  imports: [
    CommonModule,
    PowerRankingsGraphComponent,
    PanelModule,
    WeeklyTransactionsComponent,
    LeagueChampionComponent,
    DraftOrderComponent,
    LoadingComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
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

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.#leagueSub.unsubscribe();
  }

  #getPageHeader(): string {
    const opening = `${this.league.sport?.toUpperCase()} ${this.league.season}`;
    if (this.league.status === 'complete' ) {
      return opening;
    }
    if (this.league.status === 'pre_draft') {
      return `${opening} Offseason`;
    }
    return `${opening} Week ${this.weekNumber}`;
  }
}
