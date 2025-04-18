import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PowerRankingsGraphComponent } from './power-rankings-graph.component';
import { StandingsData } from '@tc-fantasy-dashboard/shared/interfaces';
import { ComponentRef, NO_ERRORS_SCHEMA } from '@angular/core';

describe('GraphComponent', () => {
  let component: PowerRankingsGraphComponent;
  let componentRef: ComponentRef<PowerRankingsGraphComponent>;
  let fixture: ComponentFixture<PowerRankingsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerRankingsGraphComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerRankingsGraphComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should set chart data and options when standingsData changes', () => {
    componentRef.setInput('standingsData', [
      { wins: 2, losses: 1, points: 15, maxPoints: 20, username: 'Manager1' },
      { wins: 3, losses: 0, points: 18, maxPoints: 20, username: 'Manager2' },
    ] as unknown as StandingsData[]);
    fixture.detectChanges();

    expect(component.chartData).toBeDefined();
    expect(component.chartOptions).toBeDefined();
  });
});
