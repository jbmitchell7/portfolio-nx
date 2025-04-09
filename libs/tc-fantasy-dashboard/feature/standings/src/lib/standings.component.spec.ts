import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandingsComponent } from './standings.component';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { mockLeague } from '@tc-fantasy-dashboard/shared/mock-data';
import { of } from 'rxjs';

describe('StandingsComponent', () => {
  let component: StandingsComponent;
  let fixture: ComponentFixture<StandingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StandingsComponent],
      providers: [
        provideHttpClient(),
        MessageService,
        {
          provide: LeagueInitService,
          useValue: {
            selectedLeague$: of(mockLeague),
          },
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set gridStyle based on mobileDevice', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('true');
    component.ngOnInit();
    expect(component.gridStyle).toBe('p-datatable-striped p-datatable-sm');
  });

  it('should update standingsData and other properties on league selection', () => {
    expect(component.standingsData).toEqual([
      {
        "avatarUrl": "",
        "losses": 0,
        "maxPoints": 0,
        "owner_id": "123",
        "playerIds": [],
        "points": 0,
        "pointsAgainst": 0,
        "streak": "",
        "streakColor": undefined,
        "streakIcon": undefined,
        "username": "",
        "wins": 0,
      },
    ]);
    expect(component.seasonStarted).toBeFalsy();
    expect(component.leagueName).toBe(mockLeague.name);
    expect(component.leagueYear).toBe(mockLeague.season);
    expect(component.pageTitle).toBe(`${mockLeague.season} Standings`);
  });
});
