import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { League, Manager } from '@tc-fantasy-dashboard/shared/interfaces';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'fd-draft-order',
  imports: [CommonModule, ScrollPanelModule],
  templateUrl: './draft-order.component.html',
})
export class DraftOrderComponent implements OnChanges {
  @Input({required: true}) league!: League;

  managersList: Manager[] = [];

  ngOnChanges(): void {
    const managers = this.league.managers
    const draft = this.league.draft;
    if (draft && managers) {
      const managerIds = Object
        .keys(draft.draft_order)
        .sort((a, b) => draft.draft_order[a] - draft.draft_order[b]);
      this.managersList = managerIds.map(id => managers[id]);
    }
  }
}
