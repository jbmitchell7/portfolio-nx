import { Component, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '@tc-fantasy-dashboard/shared/interfaces';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'fd-player-details-dialog',
  imports: [CommonModule, DialogModule],
  templateUrl: './player-details-dialog.component.html',
})
export class PlayerDetailsDialogComponent {
  player = input.required<Player>();
  visible = false;

  constructor() {
    effect(() => this.visible = !!this.player);
  }
}
