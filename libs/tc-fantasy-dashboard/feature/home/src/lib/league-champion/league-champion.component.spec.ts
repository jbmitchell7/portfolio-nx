import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueChampionComponent } from './league-champion.component';
import { CommonModule } from '@angular/common';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});