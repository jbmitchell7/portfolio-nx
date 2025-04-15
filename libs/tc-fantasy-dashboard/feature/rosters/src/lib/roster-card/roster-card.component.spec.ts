import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RosterCardComponent } from './roster-card.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('RosterCardComponent', () => {
  let component: RosterCardComponent;
  let fixture: ComponentFixture<RosterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RosterCardComponent, provideAnimationsAsync(),],
    }).compileComponents();

    fixture = TestBed.createComponent(RosterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
