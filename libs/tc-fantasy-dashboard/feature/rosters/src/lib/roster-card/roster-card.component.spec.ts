import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RosterCardComponent } from './roster-card.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { mockLeague, mockManager, mockPlayer, mockRoster } from '@tc-fantasy-dashboard/shared/mock-data';
import { ComponentRef } from '@angular/core';

describe('RosterCardComponent', () => {
  let component: RosterCardComponent;
  let componentRef: ComponentRef<RosterCardComponent>;
  let fixture: ComponentFixture<RosterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RosterCardComponent],
      providers: [provideAnimationsAsync()]
    }).compileComponents();

    fixture = TestBed.createComponent(RosterCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('roster', mockRoster);
    componentRef.setInput('players', {[mockPlayer.player_id]: mockPlayer});
    componentRef.setInput('league', mockLeague);
    fixture.detectChanges();
  });

  it('should get Manager', () => {
    expect(component.manager().user_id).toEqual(mockManager.user_id);
  });

  it('should initialize starters, bench, and taxi players correctly', () => {
    expect(component.starters.length).toBe(mockRoster.starters.length);
    expect(component.bench.length).toBe(
      mockRoster.players.filter(
        playerId => !mockRoster.starters.includes(playerId) && !mockRoster.taxi.includes(playerId)
      ).length
    );
    expect(component.taxi.length).toBe(mockRoster.taxi.length);
  });

  it('should sort bench players by position', () => {
    const benchPositions = component.bench().map(player => player.position);
    expect(benchPositions).toEqual([...benchPositions].sort());
  });

  it('should sort taxi players by position', () => {
    const taxiPositions = component.taxi().map(player => player.position);
    expect(taxiPositions).toEqual([...taxiPositions].sort());
  });
});
