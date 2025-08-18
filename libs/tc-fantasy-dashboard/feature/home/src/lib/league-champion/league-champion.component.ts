import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { League, Manager } from '@tc-fantasy-dashboard/shared/interfaces';

@Component({
  selector: 'fd-league-champion',
  imports: [CommonModule],
  templateUrl: './league-champion.component.html',
})
export class LeagueChampionComponent {
  readonly league = input.required<League>();
  readonly champion = computed<Manager | null>(() => this.#getChampion());

  #getChampion(): Manager | null {
    const rosters = this.league()?.rosters;
    if (!rosters) return null;

    const champRosterId = this.league().metadata?.latest_league_winner_roster_id;
    const champUserId = Object.keys(rosters).find(id => rosters[+id]?.roster_id === +champRosterId);
    if (!champUserId) return null;

    return this.league().managers?.[champUserId] ?? null;
  }
}
