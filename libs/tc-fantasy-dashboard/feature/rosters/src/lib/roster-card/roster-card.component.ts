import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { League, Manager, Player, Roster } from '@tc-fantasy-dashboard/shared/interfaces';
import { PanelModule } from 'primeng/panel';
import { getManager } from '@tc-fantasy-dashboard/shared/utils';
import { PositionBadgeComponent } from '@tc-fantasy-dashboard/shared/components';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fd-roster-card',
  imports: [CommonModule, PanelModule, PositionBadgeComponent],
  templateUrl: './roster-card.component.html',
  styleUrl: './roster-card.component.css',
})
export class RosterCardComponent implements OnInit {
  @Input({required: true}) roster!: Roster;
  @Input({required: true}) players!: Record<string, Player>;
  @Input({required: true}) league!: League;

  manager!: Manager;
  rosteredPlayers!: Player[];

  ngOnInit(): void {
    this.manager = getManager(this.league, this.roster.roster_id) ?? ({} as Manager);
    this.#getRosteredPlayers();
  }

  #getRosteredPlayers(): void {
    const players = this.roster.players.map((playerId) => this.players[playerId]);
    this.rosteredPlayers = players;
  }
}
