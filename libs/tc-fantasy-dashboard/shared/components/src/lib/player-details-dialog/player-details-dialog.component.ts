import { Component, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '@tc-fantasy-dashboard/shared/interfaces';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'fd-player-details-dialog',
  imports: [CommonModule, DialogModule],
  templateUrl: './player-details-dialog.component.html',
})
export class PlayerDetailsDialogComponent {
  player = input<Player>();
  readonly visible = signal<boolean>(false);

  constructor() {
    effect(() => this.visible.set(!!this.player()?.full_name));
  }
}
