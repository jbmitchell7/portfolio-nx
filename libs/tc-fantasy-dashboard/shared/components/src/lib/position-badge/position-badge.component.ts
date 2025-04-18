import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fd-position-badge',
  imports: [CommonModule],
  templateUrl: './position-badge.component.html',
  styleUrl: './position-badge.component.css',
})
export class PositionBadgeComponent implements OnInit {
  readonly position = input<string>();

  backgroundColor!: string;

  ngOnInit(): void {
    this.#getBadgeColor();
  }

  #getBadgeColor(): void {
    // first position is NFL, second is NBA, third is LOL, default is DEF (aka Team) for all
    switch (this.position()) {
      case 'QB':
      case 'C':
      case 'TOP':
        this.backgroundColor = 'red';
        break;
      case 'RB':
      case 'PF':
      case 'JUN':
        this.backgroundColor = 'orange';
        break;
      case 'WR':
      case 'SF':
      case 'MID':
        this.backgroundColor = 'blue';
        break;
      case 'TE':
      case 'SG':
      case 'ADC':
        this.backgroundColor = 'lime';
        break;
      case 'K':
      case 'PG':
      case 'SUP':
        this.backgroundColor = 'pink';
        break;
      default:
        this.backgroundColor = 'violet';
    }
  }
}
