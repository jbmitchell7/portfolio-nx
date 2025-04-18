import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerDetailsDialogComponent } from './player-details-dialog.component';
import { mockPlayer } from '@tc-fantasy-dashboard/shared/mock-data';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('PlayerDetailsDialogComponent', () => {
  let component: PlayerDetailsDialogComponent;
  let fixture: ComponentFixture<PlayerDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerDetailsDialogComponent],
      providers: [provideAnimationsAsync()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should reset player to mockPlayer when resetPlayer is called', () => {
    component.resetPlayer();
    expect(component.player()).toEqual(mockPlayer);
  });

  it('should set visible to true if player age is not 0', () => {
    component.player.set({ ...mockPlayer, age: 25 });
    fixture.detectChanges();
    expect(component.visible()).toBeTruthy();
  });

  it('should set visible to false if player age is 0', () => {
    component.player.set({ ...mockPlayer, age: 0 });
    fixture.detectChanges();
    expect(component.visible()).toBeFalsy();
  });

  it('should calculate player height correctly', () => {
    const heightInInches = 74;
    component.player.set({ ...mockPlayer, height: heightInInches });
    fixture.detectChanges();
    expect(component.playerHeight).toBe(`6'2"`);
  });
});
