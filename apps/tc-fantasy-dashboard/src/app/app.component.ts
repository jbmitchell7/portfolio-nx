import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import Bowser from "bowser";
import { ToastModule } from 'primeng/toast';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { filter, take, tap } from 'rxjs';

@Component({
  selector: 'fd-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, ToastModule]
})
export class AppComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #leagueInitService = inject(LeagueInitService);

  ngOnInit(): void {
    this.#setMobile();
    const id = localStorage.getItem('CURRENT_LEAGUE_ID');
    this.#router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        take(1),
        tap(event => {
          if (id) {
            this.#leagueInitService.initLeague(id);
            const url = event.url;
            if (!url.includes('league')) {
              this.#router.navigateByUrl('/league');
            }
          } else {
            this.#router.navigateByUrl('/welcome');
          }
        })
      )
      .subscribe();
  }

  #setMobile(): void {
    const parser = Bowser.getParser(navigator.userAgent);
    if (parser.getPlatformType() === 'mobile') {
      localStorage.setItem('MOBILE', 'true');
    } else {
      localStorage.setItem('MOBILE', 'false');
    }
  }
}
