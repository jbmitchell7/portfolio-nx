import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { League, Manager, Player, Roster } from '@tc-fantasy-dashboard/shared/interfaces';
import { getManager } from '@tc-fantasy-dashboard/shared/utils';
import { PlayerDetailsDialogComponent, PositionBadgeComponent } from '@tc-fantasy-dashboard/shared/components';
import { mockPlayer } from '@tc-fantasy-dashboard/shared/mock-data';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { sortPlayersByPosition } from '@tc-fantasy-dashboard/shared/utils';

@Component({
  selector: 'fd-roster-card',
  imports: [
    CommonModule,
    AccordionModule,
    PositionBadgeComponent,
    PanelModule,
    PlayerDetailsDialogComponent
],
  templateUrl: './roster-card.component.html'
})
export class RosterCardComponent implements OnInit {
  @Input({required: true}) roster!: Roster;
  @Input({required: true}) players!: Record<string, Player>;
  @Input({required: true}) league!: League;

  manager!: Manager;
  starters!: Player[];
  bench!: Player[];
  taxi!: Player[];
  selectedPlayer!: Player;
  dialogVisible = signal(false);

  ngOnInit(): void {
    this.manager = getManager(this.league, this.roster.roster_id) ?? ({} as Manager);

    const benchedIds = this.roster.players
      .filter(playerId => !this.roster.starters.includes(playerId) && !this.roster.taxi.includes(playerId));

    this.bench = this.#getPlayerDataList(benchedIds)
      .sort((a, b) => sortPlayersByPosition(a, b, this.league.sport));
    this.taxi = this.#getPlayerDataList(this.roster.taxi)
      .sort((a, b) => sortPlayersByPosition(a, b, this.league.sport));
    this.starters = this.#getPlayerDataList(this.roster.starters);
  }

  #getPlayerDataList(playerIds: string[]): Player[] {
    return playerIds.map(playerId => this.players[playerId] ?? mockPlayer);
  }

  openPlayerDetailsDialog(player: Player): void {
    this.selectedPlayer = player;
    this.dialogVisible.set(true);
  }
}
