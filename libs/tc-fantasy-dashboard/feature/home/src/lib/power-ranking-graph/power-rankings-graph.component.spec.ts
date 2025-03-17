import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PowerRankingsGraphComponent } from './power-rankings-graph.component';

describe('GraphComponent', () => {
  let component: PowerRankingsGraphComponent;
  let fixture: ComponentFixture<PowerRankingsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PowerRankingsGraphComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerRankingsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
