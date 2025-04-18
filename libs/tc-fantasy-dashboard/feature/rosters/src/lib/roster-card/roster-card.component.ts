import { Component, computed, input, signal } from '@angular/core';
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
export class RosterCardComponent {
  readonly roster = input.required<Roster>();
  readonly players = input.required<Record<string, Player>>();
  readonly league = input.required<League>();

  readonly manager = computed<Manager>(() => getManager(this.league(), this.roster().roster_id) ?? ({} as Manager));
  readonly starters = computed<Player[]>(() => this.#getPlayerDataList(this.roster().starters));
  readonly bench = computed<Player[]>(() => this.#getBench());
  readonly taxi = computed<Player[]>(() => (
    this.#getPlayerDataList(this.roster().taxi)
      .sort((a, b) => sortPlayersByPosition(a, b, this.league().sport))
  ));

  selectedPlayer!: Player;
  dialogVisible = signal(false);

  #getBench(): Player[] {
    const benchedIds = this.roster().players
      .filter(playerId => !this.roster().starters.includes(playerId) && !this.roster().taxi.includes(playerId));

    return this.#getPlayerDataList(benchedIds)
      .sort((a, b) => sortPlayersByPosition(a, b, this.league().sport));
  }
 
  #getPlayerDataList(playerIds: string[]): Player[] {
    return playerIds.map(playerId => this.players()[playerId] ?? mockPlayer);
  }

  openPlayerDetailsDialog(player: Player): void {
    this.selectedPlayer = player;
    this.dialogVisible.set(true);
  }
}
