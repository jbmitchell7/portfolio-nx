import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RostersComponent } from './rosters.component';
import { provideHttpClient } from '@angular/common/http';

describe('LeagueChampionComponent', () => {
  let component: RostersComponent;
  let fixture: ComponentFixture<RostersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RostersComponent, provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(RostersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
