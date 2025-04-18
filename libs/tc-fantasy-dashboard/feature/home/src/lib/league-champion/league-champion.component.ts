import { Component, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { League } from '@tc-fantasy-dashboard/shared/interfaces';

@Component({
  selector: 'fd-league-champion',
  imports: [CommonModule],
  templateUrl: './league-champion.component.html',
})
export class LeagueChampionComponent {
  readonly league = input.required<League>();
  champAvatar?: string;
  champName?: string;

  constructor() {
    effect(() => {
      const rosters = this.league().rosters;
      if (!rosters) return;
      const champRosterId = this.league().metadata?.latest_league_winner_roster_id;
      const champUserId = Object.keys(rosters).find(id => rosters[id]?.roster_id === +champRosterId);
      if (champUserId) {
        const champ = this.league().managers?.[champUserId]
        this.champName = champ?.metadata.team_name ?? champ?.display_name;
        this.champAvatar = champ?.avatarUrl;
      }
    })
  }
}
