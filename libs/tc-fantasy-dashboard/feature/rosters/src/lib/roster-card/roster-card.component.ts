import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player, Roster } from '@tc-fantasy-dashboard/shared/interfaces';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'fd-roster-card',
  imports: [CommonModule, PanelModule],
  templateUrl: './roster-card.component.html',
  styleUrl: './roster-card.component.css',
})
export class RosterCardComponent {
  @Input({required: true}) roster!: Roster;
  @Input({required: true}) players!: Record<string, Player>;
}
