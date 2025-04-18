import { Component, effect, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '@tc-fantasy-dashboard/shared/interfaces';
import { DialogModule } from 'primeng/dialog';
import { PositionBadgeComponent } from "../position-badge/position-badge.component";
import { mockPlayer } from '@tc-fantasy-dashboard/shared/mock-data';

@Component({
  selector: 'fd-player-details-dialog',
  imports: [CommonModule, DialogModule, PositionBadgeComponent],
  templateUrl: './player-details-dialog.component.html',
})
export class PlayerDetailsDialogComponent {
  player = model<Player>(mockPlayer);
  readonly visible = signal<boolean>(false);
  playerHeight!: string;

  constructor() {
    effect(() => {
      this.visible.set(this.player().age !== 0);
      this.playerHeight = this.#getPlayerHeight(this.player().height);
    });
  }

  resetPlayer(): void {
    this.player.set(mockPlayer);
  }

  #getPlayerHeight(height: number): string {
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    return `${feet}'${inches}"`;
  }
}
