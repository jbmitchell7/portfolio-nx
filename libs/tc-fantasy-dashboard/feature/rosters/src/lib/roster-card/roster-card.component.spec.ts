import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RosterCardComponent } from './roster-card.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { mockLeague, mockManager, mockPlayer, mockRoster } from '@tc-fantasy-dashboard/shared/mock-data';

describe('RosterCardComponent', () => {
  let component: RosterCardComponent;
  let fixture: ComponentFixture<RosterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RosterCardComponent],
      providers: [provideAnimationsAsync()]
    }).compileComponents();

    fixture = TestBed.createComponent(RosterCardComponent);
    component = fixture.componentInstance;
    component.roster = mockRoster;
    component.league = mockLeague;
    component.players = {[mockPlayer.player_id]: mockPlayer};
    fixture.detectChanges();
  });

  it('should get Manager', () => {
    expect(component.manager.user_id).toEqual(mockManager.user_id);
  });
});
