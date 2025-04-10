import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueChampionComponent } from './league-champion.component';
import { CommonModule } from '@angular/common';
import { mockLeague, mockManager, mockRoster } from '@tc-fantasy-dashboard/shared/mock-data';

describe('LeagueChampionComponent', () => {
  let component: LeagueChampionComponent;
  let fixture: ComponentFixture<LeagueChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, LeagueChampionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeagueChampionComponent);
    component = fixture.componentInstance;
  });

  it('should set champName and champAvatar when league has a winner', () => {
    component.league = {
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
          avatarUrl: 'avatar-url'
        },
      },
    };

    component.ngOnChanges();

    expect(component.champName).toBe('John Doe');
    expect(component.champAvatar).toBe('avatar-url');
  });
});