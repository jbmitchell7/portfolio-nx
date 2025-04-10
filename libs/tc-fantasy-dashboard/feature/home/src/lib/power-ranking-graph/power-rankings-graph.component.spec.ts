import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PowerRankingsGraphComponent } from './power-rankings-graph.component';
import { StandingsData } from '@tc-fantasy-dashboard/shared/interfaces';

describe('GraphComponent', () => {
  let component: PowerRankingsGraphComponent;
  let fixture: ComponentFixture<PowerRankingsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerRankingsGraphComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerRankingsGraphComponent);
    component = fixture.componentInstance;
    component.standingsData = [
      { wins: 2, losses: 1, points: 15, maxPoints: 20, username: 'Manager1' },
      { wins: 3, losses: 0, points: 18, maxPoints: 20, username: 'Manager2' },
    ] as unknown as StandingsData[];
    component.ngOnChanges({
      standingsData: {
        currentValue: component.standingsData,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    fixture.detectChanges();
  });

  it('should show preseason message when wins and losses are zero', () => {
    component.standingsData = [
      { wins: 0, losses: 0, points: 0, maxPoints: 0, username: 'Manager1' },
    ] as unknown as StandingsData[];
    component.ngOnChanges({
      standingsData: {
        currentValue: component.standingsData,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.showPreseasonMessage).toBeTruthy();
  });

  it('should set chart data and options when standingsData changes', () => {
    component.standingsData = [
      { wins: 2, losses: 1, points: 15, maxPoints: 20, username: 'Manager1' },
      { wins: 3, losses: 0, points: 18, maxPoints: 20, username: 'Manager2' },
    ] as unknown as StandingsData[];
    component.ngOnChanges({
      standingsData: {
        currentValue: component.standingsData,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.showPreseasonMessage).toBeFalsy();
    expect(component.chartData).toBeDefined();
    expect(component.chartOptions).toBeDefined();
    expect(component.isLoading).toBeFalsy();
  });
});
