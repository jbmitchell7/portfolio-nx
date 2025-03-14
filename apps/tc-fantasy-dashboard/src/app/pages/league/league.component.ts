import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { IconAttributionComponent } from '../../components/icon-attribution/icon-attribution.component';
import { NavbarComponent } from '@shared-global/ui';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { Subscription, filter, tap } from 'rxjs';
import { MENU_ROUTES } from './navigation.constants';
import { leagueEntryRequest } from '../../store/global.actions';
import { selectLeague } from '../../store/global.selectors';
import { clearLeagueData } from '../../store/league/league.actions';
import { clearManagersData } from '../../store/managers/managers.actions';
import { clearRosterData } from '../../store/rosters/rosters.actions';
import { League } from '@tc-fantasy-dashboard/shared/interfaces';

@Component({
  selector: 'fd-league',
  templateUrl: './league.component.html',
  imports: [
    CommonModule,
    RouterOutlet,
    IconAttributionComponent,
    NavbarComponent,
  ],
})
export class LeagueComponent implements OnInit, OnDestroy {
  readonly #store = inject(Store);
  readonly #router = inject(Router);
  #sub!: Subscription;

  menuItems!: MenuItem[];
  mobile = JSON.parse(localStorage.getItem('MOBILE') as string);
  leagueName!: string;
  logo = 'icons/helmet.png';

  ngOnInit(): void {
    this.#sub = this.#store
      .select(selectLeague)
      .pipe(
        filter((l) => !!l.sportState?.season),
        tap((l) => {
          this.leagueName = l.name;
          this.menuItems = [
            ...MENU_ROUTES,
            {
              label: 'Sleeper Link',
              icon: 'fa-solid fa-arrow-up-right-from-square',
              url: `https://sleeper.com/leagues/${l.league_id}/league`,
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
                  disabled: !l.previous_league_id,
                  command: () => this.#setLastSeason(l),
                },
                {
                  label: 'Next Season',
                  icon: 'fa-solid fa-forward',
                  disabled: l.sportState.season === l.season,
                  command: () => this.#setNextSeason(l),
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
    this.#store.dispatch(clearLeagueData());
    this.#store.dispatch(clearRosterData());
    this.#store.dispatch(clearManagersData());
    localStorage.setItem('LEAGUE_ID', '');
    this.#router.navigateByUrl('/welcome');
  }

  #setNextSeason(league: League): void {
    const nextYear = +league.season + 1;
    const nextSeasonId = localStorage.getItem(nextYear.toString());
    this.#store.dispatch(
      leagueEntryRequest({ leagueId: nextSeasonId as string })
    );
  }

  #setLastSeason(league: League): void {
    localStorage.setItem(league.season, league.league_id);
    this.#store.dispatch(
      leagueEntryRequest({ leagueId: league.previous_league_id })
    );
  }
}
