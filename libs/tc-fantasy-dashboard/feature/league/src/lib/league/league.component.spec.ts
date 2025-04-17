import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueComponent } from './league.component';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from '@shared-global/ui';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { mockLeague, mockLeagueInit } from '@tc-fantasy-dashboard/shared/mock-data';

describe('LeagueComponent', () => {
  let component: LeagueComponent;
  let fixture: ComponentFixture<LeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LeagueComponent, NavbarComponent],
    providers: [
      provideRouter([]),
      provideHttpClient(),
      MessageService,
      {
        provide: LeagueInitService,
        useValue: mockLeagueInit,
      }
    ],
  })
    .compileComponents();
  });

  beforeEach(() => {
    // necessary since Menubar from primeng breaks tests
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    //
    fixture = TestBed.createComponent(LeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.leagueName).toBe(mockLeague.name);
    expect(component.menuItems.length).toBe(6);
  });
});
