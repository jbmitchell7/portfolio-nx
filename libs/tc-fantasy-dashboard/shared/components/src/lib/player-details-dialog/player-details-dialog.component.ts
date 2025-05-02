import { Component, computed, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '@tc-fantasy-dashboard/shared/interfaces';
import { DialogModule } from 'primeng/dialog';
import { PositionBadgeComponent } from "../position-badge/position-badge.component";

@Component({
  selector: 'fd-player-details-dialog',
  imports: [CommonModule, DialogModule, PositionBadgeComponent],
  templateUrl: './player-details-dialog.component.html',
})
export class PlayerDetailsDialogComponent {
  readonly player = input.required<Player>();
  readonly visible = model<boolean>(false);
  readonly playerHeight = computed(() => this.#getPlayerHeight(this.player().height));
  readonly depthChartPosition = computed(() => `${this.player().position}${this.player().depth_chart_order}`);

  #getPlayerHeight(height: number): string {
    if (!this.player()) return '';
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    return `${feet}'${inches}"`;
  }
}
