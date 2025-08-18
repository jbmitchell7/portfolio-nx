import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Draft, LeagueResponse, ManagerRes, Roster, SportState, TradedPick, Transaction } from '@tc-fantasy-dashboard/shared/interfaces';

const apiUrl = 'https://api.sleeper.app/v1';

@Injectable({
  providedIn: 'root'
})
export class SleeperApiService {
  readonly #http = inject(HttpClient);

  getLeague(id: string): Observable<LeagueResponse> {
    return this.#http.get<LeagueResponse>(`${apiUrl}/league/${id}`);
  }

  getRosters(leagueId: string): Observable<Roster[]> {
    return this.#http.get<Roster[]>(`${apiUrl}/league/${leagueId}/rosters`);
  }

  getManagers(leagueId: string): Observable<ManagerRes[]> {
    return this.#http.get<ManagerRes[]>(`${apiUrl}/league/${leagueId}/users`);
  }

  getSportState(sport: string): Observable<SportState> {
    return this.#http.get<SportState>(`${apiUrl}/state/${sport}`);
  }

  getTransactions(leagueId: string, week: string | number): Observable<Transaction[]> {
    return this.#http.get<Transaction[]>(`${apiUrl}/league/${leagueId}/transactions/${week}`);
  }

  getDraft(draftId: string): Observable<Draft> {
    return this.#http.get<Draft>(`${apiUrl}/draft/${draftId}`);
  }

  getTradedDraftPicks(draftId: string): Observable<TradedPick[]> {
    return this.#http.get<TradedPick[]>(`${apiUrl}/draft/${draftId}/traded_picks`);
  }
}
