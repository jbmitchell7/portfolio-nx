import { Component, inject, OnDestroy } from '@angular/core';
import { GraphComponent } from '../../../components/graph/graph.component';
import { Subscription, combineLatest } from 'rxjs';
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
import {
  getCurrentTransactionsWeek,
  getRosterMoves,
  getStandingsData,
} from '@tc-fantasy-dashboard/shared/utils';
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
  rosterMoves: RosterMove[][] = [];
  playersLoading = false;
  graphHeader = TITLE_TEXT;

  constructor() {
    this.#initLeagueSub();
  }

  ngOnDestroy(): void {
    this.#leagueSub.unsubscribe();
  }

  #initLeagueSub(): void {
    this.#leagueSub = combineLatest([
      this.#leagueInitService.leagues$,
      this.#leagueInitService.playersLoading$,
    ]).subscribe(([leagues, playersLoading]) => {
      const leagueId = localStorage.getItem('CURRENT_LEAGUE_ID');
      this.playersLoading = playersLoading;
      this.league = leagues[leagueId as string];
      this.standingsData = getStandingsData(this.league);
      this.rosters = this.league.rosters;
      this.sportState = this.league.sportState;
      this.weekNumber = getCurrentTransactionsWeek(this.league);
      this.pageHeader = this.#getPageHeader();
      const transactions = this.league.transactions?.[this.weekNumber] ?? ([] as Transaction[]);
      this.#getRosterMoves(transactions);
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

  #getRosterMoves(transactions: Transaction[]): void {
    const missingPlayers: string[] = [];
    const updatedRosterMoves = transactions.map((t) => {
      const rosterMoves = getRosterMoves(t, this.league);
      this.#checkForMissingPlayers(rosterMoves, missingPlayers);
      return rosterMoves;
    });
    if (missingPlayers.length) {
      this.#leagueInitService.getPlayers(
        missingPlayers,
        this.league.sport,
        this.league.league_id
      );
    } else {
      this.rosterMoves = updatedRosterMoves;
    }
  }

  #checkForMissingPlayers(rosterMoves: RosterMove[], missingPlayerIds: string[]): void {
    rosterMoves?.forEach((m: RosterMove) => {
      m.adds?.forEach((a: Partial<Player>) => {
        if (!a.full_name) {
          missingPlayerIds.push(a.player_id as string);
        }
      });
      m.drops?.forEach((a: Partial<Player>) => {
        if (!a.full_name) {
          missingPlayerIds.push(a.player_id as string);
        }
      });
    });
  }
}
