import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RostersComponent } from './rosters.component';
import { provideHttpClient } from '@angular/common/http';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { MessageService } from 'primeng/api';
import { mockLeagueInit } from '@tc-fantasy-dashboard/shared/mock-data';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';

describe('LeagueChampionComponent', () => {
  let component: RostersComponent;
  let fixture: ComponentFixture<RostersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RostersComponent],
      providers: [
        provideHttpClient(),
        {
          provide: LeagueInitService,
          useValue: {
            ...mockLeagueInit,
            playersLoading$: of(false),
          },
        },
        MessageService,
        provideAnimationsAsync()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create roster array', () => {
    expect(component.rosters.length).toEqual(1);
  });
});
