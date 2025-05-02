import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerInfoComponent } from './player-info.component';
import { ComponentRef } from '@angular/core';
import { mockPlayer } from '@tc-fantasy-dashboard/shared/mock-data';

describe('PlayerInfoComponent', () => {
  let component: PlayerInfoComponent;
  let componentRef: ComponentRef<PlayerInfoComponent>;
  let fixture: ComponentFixture<PlayerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerInfoComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('player', mockPlayer);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
