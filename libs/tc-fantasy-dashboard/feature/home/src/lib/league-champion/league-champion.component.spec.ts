import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueChampionComponent } from './league-champion.component';
import { CommonModule } from '@angular/common';
import { mockLeague, mockManager, mockRoster } from '@tc-fantasy-dashboard/shared/mock-data';
import { ComponentRef } from '@angular/core';

describe('LeagueChampionComponent', () => {
  let component: LeagueChampionComponent;
  let componentRef: ComponentRef<LeagueChampionComponent>;
  let fixture: ComponentFixture<LeagueChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, LeagueChampionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeagueChampionComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should set champName and champAvatar when league has a winner', () => {
    componentRef.setInput('league', {
      ...mockLeague,
      metadata: {
        latest_league_winner_roster_id: '1',
        keeper_deadline: ''
      },
      rosters: {
        '1': {
          ...mockRoster,
          roster_id: 1
        },
      },
      managers: {
        '1': {
          ...mockManager,
          display_name: 'John Doe',
          avatarUrl: 'avatar-url',
          metadata: {
            team_name: 'Team A',
          }
        },
      },
    });
    fixture.detectChanges();

    expect(component.champion()?.metadata.team_name).toBe('Team A');
    expect(component.champion()?.avatarUrl).toBe('avatar-url');
  });
});