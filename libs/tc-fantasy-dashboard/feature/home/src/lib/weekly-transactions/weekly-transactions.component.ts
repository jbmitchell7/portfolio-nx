import { Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { League, Player, RosterMove, Transaction } from '@tc-fantasy-dashboard/shared/interfaces';
import { LoadingComponent } from '@tc-fantasy-dashboard/shared/components';
import { getRosterMoves } from '@tc-fantasy-dashboard/shared/utils';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { filter, Subscription, tap } from 'rxjs';

@Component({
    selector: 'fd-weekly-transactions',
    imports: [
      CommonModule,
      ProgressSpinnerModule,
      DividerModule,
      ScrollPanelModule,
      LoadingComponent
    ],
    templateUrl: './weekly-transactions.component.html',
    styleUrl: './weekly-transactions.component.css'
})
export class WeeklyTransactionsComponent implements OnInit, OnDestroy {
  readonly league = input.required<League>();
  readonly weekNumber = input.required<number>();

  readonly #leagueInitService = inject(LeagueInitService);
  #loadingSub!: Subscription;
  rosterMoves: RosterMove[][] = [];
  isLoading = true;

  ngOnInit(): void {
    this.#loadingSub = this.#leagueInitService.playersLoading$
      .pipe(
        tap(loading => this.isLoading = loading),
        filter(loading => !loading),
        tap(() => {
          const transactions = this.league().transactions?.[this.weekNumber()] ?? ([] as Transaction[]);
          this.#getRosterMoves(transactions);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#loadingSub.unsubscribe();
  }

  #getRosterMoves(transactions: Transaction[]): void {
    if (!transactions.length) {
      this.rosterMoves = [];
      return;
    }
    const missingPlayers: string[] = [];
    const updatedRosterMoves = transactions.map((t) => {
      const rosterMoves = getRosterMoves(t, this.league());
      this.#checkForMissingPlayers(rosterMoves, missingPlayers);
      return rosterMoves;
    });
    if (missingPlayers.length) {
      this.#leagueInitService.getPlayers(
        missingPlayers,
        this.league().sport,
        this.league()
      );
    } else {
      this.rosterMoves = updatedRosterMoves.slice(0, 9);
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
