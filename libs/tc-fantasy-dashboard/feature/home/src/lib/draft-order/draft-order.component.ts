import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Draft, League, Manager, TradedPick } from '@tc-fantasy-dashboard/shared/interfaces';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SleeperApiService } from '@tc-fantasy-dashboard/shared/services';
import { catchError, EMPTY, take, tap } from 'rxjs';

interface Pick {
  currentManager: Manager;
  originalManager?: Manager;
  pickNumber: number;
}

@Component({
  selector: 'fd-draft-order',
  imports: [CommonModule, ScrollPanelModule],
  templateUrl: './draft-order.component.html',
})
export class DraftOrderComponent {
  readonly #sleeperApi = inject(SleeperApiService);

  readonly league = input.required<League>();

  readonly allPicks = computed<Pick[]>(() => this.#getAllPicks());

  readonly #managersList = computed<Manager[]>(() => this.#getManagersList());
  readonly #tradedPicks = signal<Record<string, TradedPick>>({});

  constructor() {
    effect(() => {
      const draft = this.league()?.draft;
      if (!draft) {
        this.#tradedPicks.set({});
        return;
      }
      this.#getTradedPicks(draft);
    });
  }

  #getAllPicks(): Pick[] {
    const picks: Pick[] = [];
    if (!this.#managersList().length) {
      return picks;
    }
    this.#managersList().forEach((m, i) => {
      const tradedPick = this.#tradedPicks()[m.user_id];
      if (tradedPick) {
        const originalOwnerRosterId = tradedPick.roster_id;
        const originalManager = this.#managersList().find(m => m.roster_id === originalOwnerRosterId);
        const currentOwnerRosterId = tradedPick.owner_id;
        const currentManager = this.#managersList().find(m => m.roster_id === currentOwnerRosterId);
        if (currentManager) {
          picks.push({
            originalManager: originalManager,
            currentManager: currentManager,
            pickNumber: i + 1,
          });
        }
      } else {
        picks.push({
          currentManager: m,
          pickNumber: i + 1,
        });
      }
    });
    return picks;
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
        tap(picks => this.#setTradedPicks(picks.filter(pick => pick.round === 1))),
        catchError(() => {
          this.#tradedPicks.set({});
          return EMPTY;
        })
      )
      .subscribe();
  }

  #setTradedPicks(picks: TradedPick[]): void {
    const newPicks = picks.reduce((acc, pick) => {
      const managerId = this.league().rosters?.[pick.roster_id]?.owner_id;
      if (!managerId) {
        return acc;
      }
      acc[managerId] = pick;
      return acc;
    }, {} as Record<string, TradedPick>);
    this.#tradedPicks.set(newPicks);
  }
}
