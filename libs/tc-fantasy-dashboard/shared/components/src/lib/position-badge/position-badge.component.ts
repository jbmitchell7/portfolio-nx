import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fd-position-badge',
  imports: [CommonModule],
  templateUrl: './position-badge.component.html',
  styleUrl: './position-badge.component.css',
})
export class PositionBadgeComponent {
  readonly position = input<string>();
  readonly backgroundColor = computed<string>(() => this.#getBadgeColor());

  #getBadgeColor(): string {
    // first position is NFL, second is NBA, third is LOL, default is DEF (aka Team) for all
    switch (this.position()) {
      case 'QB':
      case 'C':
      case 'TOP':
        return 'red';
      case 'RB':
      case 'PF':
      case 'JUN':
        return 'orange';
      case 'WR':
      case 'SF':
      case 'MID':
        return 'blue';
      case 'TE':
      case 'SG':
      case 'ADC':
        return 'lime';
      case 'K':
      case 'PG':
      case 'SUP':
        return 'pink';
      default:
        return 'violet';
    }
  }
}
