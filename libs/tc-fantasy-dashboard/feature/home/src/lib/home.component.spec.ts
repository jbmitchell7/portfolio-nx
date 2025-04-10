import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { MessageService } from 'primeng/api';
import { mockLeague, mockLeagueInit } from '@tc-fantasy-dashboard/shared/mock-data';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
        {
          provide: LeagueInitService,
          useValue: mockLeagueInit,
        },
        MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.league).toEqual(mockLeague);
    expect(component.rosters).toEqual(mockLeague.rosters);
    expect(component.pageHeader).toEqual('NFL 2023');
  });
});
