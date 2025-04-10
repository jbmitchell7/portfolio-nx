import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeeklyTransactionsComponent } from './weekly-transactions.component';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { mockLeague, mockPlayer, mockTransaction } from '@tc-fantasy-dashboard/shared/mock-data';
import { of } from 'rxjs';

describe('WeeklyTransactionsComponent', () => {
  let component: WeeklyTransactionsComponent;
  let fixture: ComponentFixture<WeeklyTransactionsComponent>;
  let service: LeagueInitService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyTransactionsComponent],
      providers: [
        provideHttpClient(),
        MessageService,
        {
          provide: LeagueInitService,
          useValue: {
            playersLoading$: of(false),
            getPlayers: () => of(null)
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyTransactionsComponent);
    component = fixture.componentInstance;
    component.weekNumber = 1;
    service = TestBed.inject(LeagueInitService);
    fixture.detectChanges();
  });

  it('should handle no league transactions gracefully', () => {
    component.league = {
      ...mockLeague,
      transactions: {}
    };
    component.ngOnInit();
    expect(component.rosterMoves).toEqual([]);
  });

  it('should call getPlayers if there are missing players', () => {
    const spy = jest.spyOn(service, 'getPlayers');
    component.league = {
      ...mockLeague,
      transactions: {
        1: [mockTransaction]
      }
    };
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call set roster moves if no players are missing', () => {
    component.league = {
      ...mockLeague,
      transactions: {
        1: [mockTransaction]
      },
      players: {
        1: mockPlayer
      }
    };
    component.ngOnInit();
    expect(component.rosterMoves.length).toEqual(1);
  });
});
