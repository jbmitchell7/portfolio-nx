import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FantasyDashboardApiService } from './fantasy-dashboard-api.service';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { mockPlayer } from '@tc-fantasy-dashboard/shared/mock-data';

describe('FantasyDashboardApiService', () => {
  let service: FantasyDashboardApiService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://fd-api.thundercloud.dev/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), MessageService]
    });
    service = TestBed.inject(FantasyDashboardApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call getPlayers and return data on success', () => {
    const mockResponse = [mockPlayer];
    const sport = 'nfl';
    const ids = ['1'];

    service.getPlayers(sport, ids).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/players/${sport}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ players: ids });
    req.flush(mockResponse);
  });

  it('should handle error and return null when getPlayers fails', () => {
    const sport = 'nfl';
    const ids = ['1', '2', '3'];

    service.getPlayers(sport, ids).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/players/${sport}`);
    expect(req.request.method).toBe('POST');
  });
});
