import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { League, Manager, Player, Roster } from '@tc-fantasy-dashboard/shared/interfaces';
import { getManager } from '@tc-fantasy-dashboard/shared/utils';
import { mockPlayer } from '@tc-fantasy-dashboard/shared/mock-data';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { sortPlayersByPosition } from '@tc-fantasy-dashboard/shared/utils';
import { PlayerInfoComponent } from '@tc-fantasy-dashboard/shared/components';

@Component({
  selector: 'fd-roster-card',
  imports: [
    CommonModule,
    AccordionModule,
    PanelModule,
    PlayerInfoComponent
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
  readonly taxi = computed<Player[]>(() => {
    const taxi = this.roster().taxi;
    if (!taxi?.length) {
      return [];
    }
    return this.#getPlayerDataList(taxi)
      .sort((a, b) => sortPlayersByPosition(a, b, this.league().sport));
  });

  #getBench(): Player[] {
    const benchedIds = this.roster().players
      .filter(playerId => !this.roster().starters.includes(playerId) && !this.roster().taxi?.includes(playerId));

    return this.#getPlayerDataList(benchedIds)
      .sort((a, b) => sortPlayersByPosition(a, b, this.league().sport));
  }
 
  #getPlayerDataList(playerIds: string[]): Player[] {
    return playerIds.map(playerId => this.players()[playerId] ?? mockPlayer);
  }
}
