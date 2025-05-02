import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerDetailsDialogComponent } from '../player-details-dialog/player-details-dialog.component';
import { PositionBadgeComponent } from '../position-badge/position-badge.component';
import { Player } from '@tc-fantasy-dashboard/shared/interfaces';

@Component({
  selector: 'fd-player-info',
  imports: [CommonModule, PlayerDetailsDialogComponent, PositionBadgeComponent],
  templateUrl: './player-info.component.html',
})
export class PlayerInfoComponent {
  readonly player = input.required<Player>();
  readonly dialogVisible = signal(false);

  openPlayerDetailsDialog(): void {
    this.dialogVisible.set(true);
  }
}
