import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { StandingsData } from '@tc-fantasy-dashboard/shared/interfaces';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { getStandingsData } from '@tc-fantasy-dashboard/shared/utils';

interface Column {
  field: string;
  header: string;
}

const STANDINGS_COLUMNS: Column[] = [
  {
    field: 'username',
    header: 'Manager'
  },
  {
    field: 'wins',
    header: 'Wins'
  },
  {
    field: 'losses',
    header: 'Losses'
  },
  {
    field: 'streak',
    header: 'Streak'
  },
  {
    field: 'maxPoints',
    header: 'Max Points'
  },
  {
    field: 'points',
    header: 'PF'
  },
  {
    field: 'pointsAgainst',
    header: 'PA'
  }
];

@Component({
    selector: 'fd-standings',
    templateUrl: './standings.component.html',
    imports: [CommonModule, TableModule, TagModule]
})
export class StandingsComponent implements OnInit, OnDestroy {
  readonly #leagueInitService = inject(LeagueInitService);
  #sub!: Subscription;
  pageTitle!: string;
  standingsData!: StandingsData[];
  columnDefs = STANDINGS_COLUMNS;
  leagueYear!: string;
  leagueName!: string;
  dataLoaded = false;
  maxGridWidth = 690;
  seasonStarted = false;
  mobileDevice = JSON.parse(localStorage.getItem('MOBILE') as string);
  gridStyle = `p-datatable-striped ${this.mobileDevice ? 'p-datatable-sm' : ''}`

  ngOnInit(): void {
    this.#sub = this.#leagueInitService.leagues$
      .pipe(
        tap((leagues) => {
          const leagueId = localStorage.getItem('CURRENT_LEAGUE_ID');
          const league = leagues[leagueId as string];
          this.standingsData = getStandingsData(league);
          this.seasonStarted = this.standingsData[0].wins !== 0 || this.standingsData[0].losses !== 0;
          this.leagueName = league.name;
          this.leagueYear = league.season;
          this.pageTitle = ` ${this.leagueYear} Standings`;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }
}
