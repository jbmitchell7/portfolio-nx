import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IconAttributionComponent } from '../../components/icon-attribution/icon-attribution.component';
import { NavbarComponent } from '@shared-global/ui';
import { MenuItem } from 'primeng/api';
import { filter, Subscription, tap, combineLatest } from 'rxjs';
import { MENU_ROUTES } from './navigation.constants';
import { League } from '@tc-fantasy-dashboard/shared/interfaces';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'fd-league',
  templateUrl: './league.component.html',
  imports: [
    CommonModule,
    IconAttributionComponent,
    NavbarComponent,
    ProgressSpinnerModule,
    RouterModule
  ],
})
export class LeagueComponent implements OnInit, OnDestroy {
  readonly #router = inject(Router);
  readonly #leagueInitService = inject(LeagueInitService);
  #sub!: Subscription;

  menuItems!: MenuItem[];
  mobile = JSON.parse(localStorage.getItem('MOBILE') as string);
  leagueName!: string;
  leagueYear!: string;
  logo = 'icons/helmet.png';
  isLoading = true;

  ngOnInit(): void {

    this.#sub = combineLatest([
      this.#leagueInitService.leagues$,
      this.#leagueInitService.isLoading$,
    ])
      .pipe(
        tap(([_, loading]) => this.isLoading = loading),
        filter(([leagues, loading]) => !loading && !!leagues),
        tap(([leagues]) => {
          const leagueId = localStorage.getItem('CURRENT_LEAGUE_ID');
          const league = leagues[leagueId as string];
          this.leagueName = league.name;
          this.leagueYear = league.season;
          this.menuItems = [
            ...MENU_ROUTES,
            {
              label: 'Sleeper Link',
              icon: 'fa-solid fa-arrow-up-right-from-square',
              url: `https://sleeper.com/leagues/${league.league_id}/league`,
            },
            {
              label: 'Change League/Season',
              icon: 'fa-solid fa-shuffle',
              items: [
                {
                  label: 'Change League',
                  icon: 'fa-solid fa-arrows-rotate',
                  command: () => this.#resetLeague(),
                },
                {
                  label: 'Previous Season',
                  icon: 'fa-solid fa-backward',
                  disabled: !league.previous_league_id,
                  command: () => this.#setLastSeason(league),
                },
                {
                  label: 'Next Season',
                  icon: 'fa-solid fa-forward',
                  disabled: league.sportState?.season === league.season,
                  command: () => this.#setNextSeason(league),
                },
              ],
            },
          ];
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }

  #resetLeague(): void {
    this.#leagueInitService.resetLeagueState();
    localStorage.setItem('CURRENT_LEAGUE_ID', '');
    this.#router.navigateByUrl('/welcome');
  }

  #setNextSeason(league: League): void {
    const nextYear = +league.season + 1;
    const nextSeasonId = localStorage.getItem(nextYear.toString());
    this.#leagueInitService.initLeague(nextSeasonId as string);
  }

  #setLastSeason(league: League): void {
    localStorage.setItem(league.season, league.league_id);
    this.#leagueInitService.initLeague(league.previous_league_id);
  }
}
