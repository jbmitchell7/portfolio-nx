import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

// const apiUrl = 'http://localhost:3000/api';
const apiUrl = 'https://fd-api.thundercloud.dev/api';

@Injectable({
  providedIn: 'root'
})
export class FantasyDashboardApiService {
  readonly http = inject(HttpClient);
  readonly #messageService = inject(MessageService);

  getPlayers(sport: string, ids: string[]): Observable<unknown> {
    return this.http.post(`${apiUrl}/${sport}`, {players: ids})
      .pipe(
        map(this.#extractResponseData),
        catchError(() => {
          this.#messageService.add({
            severity: 'warn',
            summary: 'Error',
            detail: 'Cannot retrieve players. Try again later.'
          })
          return of(null);
        })
      )
  }

  #extractResponseData(res: unknown): unknown {
    const body = res;
    return body || {};
  }
}
