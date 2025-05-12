import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@shared-global/ui';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { filter, Subscription, tap, combineLatest } from 'rxjs';
import { MENU_ROUTES } from '../league-menu-items';
import { League } from '@tc-fantasy-dashboard/shared/interfaces';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IconAttributionComponent } from '@tc-fantasy-dashboard/shared/components';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'fd-league',
  templateUrl: './league.component.html',
  imports: [
    CommonModule,
    IconAttributionComponent,
    NavbarComponent,
    ProgressSpinnerModule,
    RouterModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
})
export class LeagueComponent implements OnInit, OnDestroy {
  readonly #leagueInitService = inject(LeagueInitService);
  readonly #confirmationService = inject(ConfirmationService);
  readonly #messageService = inject(MessageService);
  readonly #clipboard = inject(Clipboard);
  #sub!: Subscription;

  menuItems!: MenuItem[];
  mobile = JSON.parse(localStorage.getItem('MOBILE') as string);
  leagueName!: string;
  logo = 'icons/helmet.png';
  isLoading = true;

  ngOnInit(): void {
    this.#sub = combineLatest([
      this.#leagueInitService.selectedLeague$,
      this.#leagueInitService.isLoading$,
    ])
      .pipe(
        tap(([, loading]) => this.isLoading = loading),
        filter(([selectedLeague, loading]) => !loading && !!selectedLeague),
        tap(([selectedLeague]) => {
          const league = selectedLeague;
          this.leagueName = league.name;
          this.menuItems = [
            ...MENU_ROUTES,
            {
              label: 'Change League',
              icon: 'fa-solid fa-arrows-rotate',
              command: () => this.#resetLeague(),
            },
            {
              label: 'Change Season',
              icon: 'fa-solid fa-shuffle',
              items: [
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
            {
              label: 'Fantasy Resources',
              icon: 'fa-solid fa-arrow-up-right-from-square',
              items: this.#getFantasyResources(league),
            },
          ];
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }

  #getFantasyResources(league: League): MenuItem[] {
    const resources: MenuItem[] = [
      {
        label: 'Sleeper',
        icon: 'fa-solid fa-trophy',
        url: `https://sleeper.com/leagues/${league.league_id}/league`
      },
      {
        label: 'Rotowire',
        icon: 'fa-solid fa-chart-simple',
        url: `https://www.rotowire.com/`
      },
    ];
    if (league.sport === 'nfl') {
      resources.push(
        {
          label: 'Keep/Trade/Cut',
          icon: 'fa-solid fa-right-left',
          url: `https://keeptradecut.com/`
        },
        {
          label: 'Reddit FF Trade Analyzer',
          icon: 'fa-solid fa-right-left',
          url: `https://www.reddit.com/r/TradeAnalyzerFF/`
        },
      );
    }
    if (league.sport === 'nba') {
      resources.push(
        {
          label: 'Reddit Fantasy Basketball',
          icon: 'fa-solid fa-share-nodes',
          url: `https://www.reddit.com/r/fantasybball/`
        }
      );
    }
    if (league.sport === 'lcs') {
      resources.push(
        {
          label: 'Reddit Fantasy LCS',
          url: `https://www.reddit.com/r/FantasyLCS/`,
          icon: 'fa-solid fa-share-nodes'
        },
      );
    }
    resources.push(
      {
        label: 'Copy League Id',
        icon: 'fa-solid fa-copy',
        command: () => this.#copyLeagueId(league.league_id),
      }
    );
    return resources;
  }

  #resetLeague(): void {
    this.#confirmationService.confirm({
      message: 'Are you sure?',
      header: 'Change League',
      acceptButtonProps: {
        severity: 'success'
      },
      rejectButtonProps: {
        severity: 'danger'
      },
      accept: () => {
        this.#leagueInitService.resetLeagueState();
      },
    });
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

  #copyLeagueId(leagueId: string): void {
    this.#clipboard.copy(leagueId);
    this.#messageService.add({
      severity: 'success',
      summary: 'League ID Copied',
      life: 3000,
    });
  }
}
