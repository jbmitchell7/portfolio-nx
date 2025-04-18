import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerDetailsDialogComponent } from './player-details-dialog.component';
import { mockPlayer } from '@tc-fantasy-dashboard/shared/mock-data';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ComponentRef } from '@angular/core';

describe('PlayerDetailsDialogComponent', () => {
  let component: PlayerDetailsDialogComponent;
  let componentRef: ComponentRef<PlayerDetailsDialogComponent>;
  let fixture: ComponentFixture<PlayerDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerDetailsDialogComponent],
      providers: [provideAnimationsAsync()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerDetailsDialogComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('player', {...mockPlayer, height: 74});
    fixture.detectChanges();
  });

  it('should calculate player height correctly', () => {
    expect(component.playerHeight).toBe(`6'2"`);
  });
});
