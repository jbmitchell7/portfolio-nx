import { TestBed } from '@angular/core/testing';
import { SleeperApiService } from './sleeper-api.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  mockDraft,
  mockLeagueResponse,
  mockManager,
  mockRoster,
  mockSportState,
  mockTransaction,
} from '@tc-fantasy-dashboard/shared/mock-data';
import { provideHttpClient } from '@angular/common/http';
import {
  Manager,
  Roster,
  Transaction,
} from '@tc-fantasy-dashboard/shared/interfaces';

describe('FantasyDashboardApiService', () => {
  let service: SleeperApiService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://api.sleeper.app/v1';
  const leagueId = mockLeagueResponse.league_id;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SleeperApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch league data', () => {
    service.getLeague(leagueId).subscribe((response) => {
      expect(response).toEqual(mockLeagueResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/league/${leagueId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLeagueResponse);
  });

  it('should fetch rosters', () => {
    const mockRosters = [mockRoster] as Roster[];
    service.getRosters(leagueId).subscribe((response) => {
      expect(response).toEqual(mockRosters);
    });

    const req = httpMock.expectOne(`${apiUrl}/league/${leagueId}/rosters`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRosters);
  });

  it('should fetch managers', () => {
    const mockManagers = [mockManager] as Manager[];
    service.getManagers(leagueId).subscribe((response) => {
      expect(response).toEqual(mockManagers);
    });

    const req = httpMock.expectOne(`${apiUrl}/league/${leagueId}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockManagers);
  });

  it('should fetch sport state', () => {
    service.getSportState('nfl').subscribe((response) => {
      expect(response).toEqual(mockSportState);
    });

    const req = httpMock.expectOne(`${apiUrl}/state/nfl`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSportState);
  });

  it('should fetch transactions', () => {
    const mockTransactions = [mockTransaction] as Transaction[];
    service.getTransactions(leagueId, 1).subscribe((response) => {
      expect(response).toEqual(mockTransactions);
    });

    const req = httpMock.expectOne(
      `${apiUrl}/league/${leagueId}/transactions/1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockTransactions);
  });

  it('should fetch draft data', () => {
    service.getDraft('1').subscribe((response) => {
      expect(response).toEqual(mockDraft);
    });

    const req = httpMock.expectOne(`${apiUrl}/draft/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDraft);
  });
});
