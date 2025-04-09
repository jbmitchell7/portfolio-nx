import { TestBed } from '@angular/core/testing';
import { LeagueInitService } from './league-init.service';
import { provideRouter, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { FantasyDashboardApiService } from '../api-fantasy-dashboard/fantasy-dashboard-api.service';
import { SleeperApiService } from '../api-sleeper/sleeper-api.service';
import { mockLeague, mockLeagueResponse, mockPlayer, mockSportState, mockTransaction } from '@tc-fantasy-dashboard/shared/mock-data';
import { League } from '@tc-fantasy-dashboard/shared/interfaces';

describe('LeagueInitService', () => {
  let service: LeagueInitService;
  let router: Router;
  let messageService: MessageService;
  let fantasyDashboardApiService: FantasyDashboardApiService;
  let sleeperApiService: SleeperApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LeagueInitService,
        MessageService,
        provideRouter([]),
        provideHttpClient()
      ],
    });

    router = TestBed.inject(Router);
    messageService = TestBed.inject(MessageService);
    service = TestBed.inject(LeagueInitService);
    fantasyDashboardApiService = TestBed.inject(FantasyDashboardApiService);
    sleeperApiService = TestBed.inject(SleeperApiService);
  });

  it('resetLeagueState', () => {
    const localStorageSpy = jest.spyOn(Storage.prototype, 'setItem');
    const routerSpy = jest.spyOn(router, 'navigateByUrl');
    service.resetLeagueState();

    expect(localStorageSpy).toHaveBeenCalledWith('CURRENT_LEAGUE_ID', '');
    expect(routerSpy).toHaveBeenCalledWith('/welcome');
  });

  it('getPlayers should fetch players and update the league', () => {
    const playerIds = ['player1', 'player2'];
    const sport = 'nfl';

    const apiResponse = [
      { player_id: 'player1', name: 'Player One' },
      { player_id: 'player2', name: 'Player Two' },
    ];

    const fantasyDashboardApiServiceSpy = jest.spyOn(
      fantasyDashboardApiService,
      'getPlayers'
    ).mockReturnValue(of(apiResponse));

    service.getPlayers(playerIds, sport, mockLeague);

    expect(fantasyDashboardApiServiceSpy).toHaveBeenCalledWith(sport, playerIds);
  });

  it('getPlayers should not fetch players if already loaded', () => {
    const playerIds = ['player1'];
    const sport = 'nfl';
    const league = {
      ...mockLeague,
      players: {
        player1: { player_id: 'player1', name: 'Player One' },
      },
    } as unknown as League;

    const fantasyDashboardApiServiceSpy = jest.spyOn(
      fantasyDashboardApiService,
      'getPlayers'
    );

    service.getPlayers(playerIds, sport, league);

    expect(fantasyDashboardApiServiceSpy).not.toHaveBeenCalled();
  });

  it('getPlayers should handle errors gracefully', () => {
    const playerIds = [mockPlayer.player_id, '23'];
    const sport = 'nfl';

    const fantasyDashboardApiServiceSpy = jest.spyOn(
      fantasyDashboardApiService,
      'getPlayers'
    ).mockReturnValue(throwError(() => new Error('API Error')));
    const messageServiceSpy = jest.spyOn(messageService, 'add');

    service.getPlayers(playerIds, sport, mockLeague);

    expect(fantasyDashboardApiServiceSpy).toHaveBeenCalledWith(sport, playerIds);
    expect(messageServiceSpy).toHaveBeenCalledWith({
      severity: 'warning',
      summary: 'Error',
      detail: 'Cannot fetch players. Please try again later.',
    });
  });

  it('getTransactions should fetch transactions and update the league', () => {
    const week = 1;
    const sleeperApiServiceSpy = jest.spyOn(
      sleeperApiService,
      'getTransactions'
    ).mockReturnValue(of([mockTransaction]));

    service.getTransactions(mockLeague, week);

    expect(sleeperApiServiceSpy).toHaveBeenCalledWith(mockLeague.league_id, week);
  });

  it('getTransactions should handle errors gracefully', () => {
    const week = 1;

    const sleeperApiServiceSpy = jest.spyOn(
      sleeperApiService,
      'getTransactions'
    ).mockReturnValue(throwError(() => new Error('API Error')));
    const messageServiceSpy = jest.spyOn(messageService, 'add');
    const resetLeagueStateSpy = jest.spyOn(service, 'resetLeagueState');

    service.getTransactions(mockLeague, week);

    expect(sleeperApiServiceSpy).toHaveBeenCalledWith(mockLeague.league_id, week);
    expect(messageServiceSpy).toHaveBeenCalledWith({
      severity: 'warning',
      summary: 'Error',
      detail: 'Cannot fetch transactions. Please try again later.',
    });
    expect(resetLeagueStateSpy).toHaveBeenCalled();
  });

  it('initLeague should fetch league data and update the selected league', () => {
    const sleeperApiServiceGetLeagueSpy = jest.spyOn(
      sleeperApiService,
      'getLeague'
    ).mockReturnValue(of(mockLeagueResponse));
    const sleeperApiServiceGetSportStateSpy = jest.spyOn(
      sleeperApiService,
      'getSportState'
    ).mockReturnValue(of(mockSportState));

    service.initLeague(mockLeague.league_id);

    expect(sleeperApiServiceGetLeagueSpy).toHaveBeenCalledWith(mockLeague.league_id);
    expect(sleeperApiServiceGetSportStateSpy).toHaveBeenCalledWith('nfl');
  });

  it('initLeague should handle errors gracefully', () => {
    const sleeperApiServiceSpy = jest.spyOn(
      sleeperApiService,
      'getLeague'
    ).mockReturnValue(throwError(() => new Error('API Error')));
    const messageServiceSpy = jest.spyOn(messageService, 'add');
    const resetLeagueStateSpy = jest.spyOn(service, 'resetLeagueState');

    service.initLeague(mockLeague.league_id);

    expect(sleeperApiServiceSpy).toHaveBeenCalledWith(mockLeague.league_id);
    expect(messageServiceSpy).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail:
        'Cannot fetch league data. Please try again later or try another id.',
    });
    expect(resetLeagueStateSpy).toHaveBeenCalled();
  });
});