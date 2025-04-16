import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { $dt } from '@primeng/themes';

@Component({
  selector: 'fd-position-badge',
  imports: [CommonModule],
  templateUrl: './position-badge.component.html',
})
export class PositionBadgeComponent implements OnInit {
  @Input({required: true}) sport!: string;
  @Input({required: true}) position!: string;

  backgroundColor!: any;

  ngOnInit(): void {
    if (this.sport === 'nfl') {
      this.#getNFLBadgeColor();
    }
  }

  #getNFLBadgeColor(): void {
    switch (this.position) {
      case 'QB':
        this.backgroundColor = $dt('red.500');
        break;
      case 'RB':
        this.backgroundColor = $dt('orange.500');
        break;
      case 'WR':
        this.backgroundColor = $dt('sky.500');
        break;
      case 'TE':
        this.backgroundColor = $dt('lime.500');
        break;
      case 'K':
        this.backgroundColor = $dt('pink.500');
        break;
      default:
        this.backgroundColor = $dt('violet.500');
    }
  }
}
