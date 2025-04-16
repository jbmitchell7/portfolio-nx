import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { League, Manager, Player, Roster } from '@tc-fantasy-dashboard/shared/interfaces';
import { getManager } from '@tc-fantasy-dashboard/shared/utils';
import { PositionBadgeComponent } from '@tc-fantasy-dashboard/shared/components';
import { mockPlayer } from '@tc-fantasy-dashboard/shared/mock-data';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'fd-roster-card',
  imports: [CommonModule, AccordionModule, PositionBadgeComponent, PanelModule],
  templateUrl: './roster-card.component.html',
  styleUrl: './roster-card.component.css',
})
export class RosterCardComponent implements OnInit {
  @Input({required: true}) roster!: Roster;
  @Input({required: true}) players!: Record<string, Player>;
  @Input({required: true}) league!: League;

  manager!: Manager;
  starters!: Player[];
  bench!: Player[];
  taxi!: Player[];

  ngOnInit(): void {
    this.manager = getManager(this.league, this.roster.roster_id) ?? ({} as Manager);

    const benchedIds = this.roster.players
      .filter(playerId => !this.roster.starters.includes(playerId) && !this.roster.taxi.includes(playerId));

    this.bench = this.#getPlayerDataList(benchedIds);
    this.starters = this.#getPlayerDataList(this.roster.starters);
    this.taxi = this.#getPlayerDataList(this.roster.taxi);
  }

  #getPlayerDataList(playerIds: string[]): Player[] {
    return playerIds.map(playerId => this.players[playerId] ?? mockPlayer);
  }
}
