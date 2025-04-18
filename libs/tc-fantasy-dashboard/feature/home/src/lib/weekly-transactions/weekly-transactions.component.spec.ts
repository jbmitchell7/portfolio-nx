import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeeklyTransactionsComponent } from './weekly-transactions.component';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { mockLeague, mockPlayer, mockTransaction } from '@tc-fantasy-dashboard/shared/mock-data';
import { of } from 'rxjs';
import { ComponentRef } from '@angular/core';

describe('WeeklyTransactionsComponent', () => {
  let component: WeeklyTransactionsComponent;
  let componentRef: ComponentRef<WeeklyTransactionsComponent>;
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
    componentRef = fixture.componentRef;
    componentRef.setInput('weekNumber', 1);
    service = TestBed.inject(LeagueInitService);
  });

  it('should handle no league transactions gracefully', () => {
    componentRef.setInput('league', {
      ...mockLeague,
      transactions: {}
    });
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.rosterMoves).toEqual([]);
  });

  it('should call getPlayers if there are missing players', () => {
    const spy = jest.spyOn(service, 'getPlayers');
    componentRef.setInput('league', {
      ...mockLeague,
      transactions: {
        1: [mockTransaction]
      }
    });
    fixture.detectChanges();

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call set roster moves if no players are missing', () => {
    componentRef.setInput('league', {
      ...mockLeague,
      transactions: {
        1: [mockTransaction]
      },
      players: {
        1: mockPlayer
      }
    });
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.rosterMoves.length).toEqual(1);
  });
});
