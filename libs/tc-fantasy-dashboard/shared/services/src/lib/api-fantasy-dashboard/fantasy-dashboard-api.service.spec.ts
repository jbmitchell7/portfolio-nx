import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FantasyDashboardApiService } from './fantasy-dashboard-api.service';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

describe('FantasyDashboardApiService', () => {
  let service: FantasyDashboardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting(), MessageService]
    });
    service = TestBed.inject(FantasyDashboardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
