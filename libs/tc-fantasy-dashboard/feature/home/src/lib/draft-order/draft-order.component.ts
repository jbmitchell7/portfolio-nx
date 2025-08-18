import { Component, computed, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Draft, League, Manager, TradedPick } from '@tc-fantasy-dashboard/shared/interfaces';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SleeperApiService } from '@tc-fantasy-dashboard/shared/services';
import { catchError, EMPTY, take, tap } from 'rxjs';

@Component({
  selector: 'fd-draft-order',
  imports: [CommonModule, ScrollPanelModule],
  templateUrl: './draft-order.component.html',
})
export class DraftOrderComponent {
  readonly #sleeperApi = inject(SleeperApiService);
  readonly league = input.required<League>();
  readonly managersList = computed<Manager[]>(() => this.#getManagersList());
  tradedPicks: Record<string, TradedPick> = {};

  constructor() {
    effect(() => {
      const draft = this.league()?.draft;
      if (!draft) {
        this.tradedPicks = {};
        return;
      }
      this.#getTradedPicks(draft);
    });
  }

  #getManagersList(): Manager[] {
    const managers = this.league()?.managers
    const draft = this.league()?.draft;
    if (!draft || !managers) return [];
    const managerIds = Object
      .keys(draft.draft_order)
      .sort((a, b) => draft.draft_order[a] - draft.draft_order[b]);
    return managerIds.map(id => managers[id]);
  }

  #getTradedPicks(draft: Draft): void {
    this.#sleeperApi
      .getTradedDraftPicks(draft.draft_id)
      .pipe(
        take(1),
        tap(picks => this.#setPicks(picks.filter(pick => pick.round === 1))),
        catchError(() => {
          this.tradedPicks = {};
          return EMPTY;
        })
      )
      .subscribe();
  }

  #setPicks(picks: TradedPick[]): void {
    this.tradedPicks = picks.reduce((acc, pick) => {
      const managerId = this.league().rosters?.[pick.owner_id]?.owner_id;
      if (!managerId) {
        return acc;
      }
      acc[managerId] = pick;
      return acc;
    }, {} as Record<string, TradedPick>);
  }
}
