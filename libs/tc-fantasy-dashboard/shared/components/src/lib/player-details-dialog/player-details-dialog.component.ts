import { Component, effect, input, model } from '@angular/core';
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
  playerHeight!: string;

  constructor() {
    effect(() => {
      if (!this.player()) return;
      this.playerHeight = this.#getPlayerHeight(this.player().height);
    });
  }

  #getPlayerHeight(height: number): string {
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    return `${feet}'${inches}"`;
  }
}
