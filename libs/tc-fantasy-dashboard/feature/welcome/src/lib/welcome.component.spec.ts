import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let leagueInitService: LeagueInitService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), LeagueInitService, MessageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    leagueInitService = TestBed.inject(LeagueInitService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call LeagueInitService and navigate to league when setLeagueId is called with valid input', () => {
    const leagueInitServiceSpy = jest.spyOn(leagueInitService, 'initLeague');
    const routerSpy = jest.spyOn(router, 'navigate');

    component.leagueInputForm.setValue('');
    component.setLeagueId();
    expect(leagueInitServiceSpy).not.toHaveBeenCalled();
    expect(routerSpy).not.toHaveBeenCalled();

    component.leagueInputForm.setValue('123');
    component.setLeagueId();
    expect(leagueInitServiceSpy).toHaveBeenCalledWith('123');
    expect(routerSpy).toHaveBeenCalledWith(['league']);
  });
});
