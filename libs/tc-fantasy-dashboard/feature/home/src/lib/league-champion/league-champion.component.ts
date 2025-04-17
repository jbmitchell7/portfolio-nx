import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { League } from '@tc-fantasy-dashboard/shared/interfaces';

@Component({
  selector: 'fd-league-champion',
  imports: [CommonModule],
  templateUrl: './league-champion.component.html',
})
export class LeagueChampionComponent implements OnChanges {
  @Input({required: true}) league!: League;
  
  champAvatar?: string;
  champName?: string;

  ngOnChanges(): void {
    const champRosterId = this.league.metadata?.latest_league_winner_roster_id;
    if (this.league.rosters && champRosterId) {
      const champUserId = Object.keys(this.league.rosters).find(id => this.league.rosters?.[id].roster_id === +champRosterId);
      if (champUserId) {
        const champ = this.league.managers?.[champUserId]
        this.champName = champ?.metadata.team_name ?? champ?.display_name;
        this.champAvatar = champ?.avatarUrl;
      }
    }
    
  }
}
