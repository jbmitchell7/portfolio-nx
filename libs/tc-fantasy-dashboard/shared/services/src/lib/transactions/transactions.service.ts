import { Injectable } from '@angular/core';
import { Transaction } from '@tc-fantasy-dashboard/shared/interfaces';
import { BehaviorSubject, catchError, Observable, of, take, tap } from 'rxjs';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends DataService {
  #transactions = new BehaviorSubject<Record<string, Transaction[]>>({});

  get transactions$(): Observable<Record<string, Transaction[]>> {
    return this.#transactions.asObservable();
  }

  setTransactionsState(transactions: Record<string, Transaction[]>): void {
    this.#transactions.next(transactions);
  }

  getTransactions(leagueId: string, week: number): void {
    this.setLoadingState(true);
    this.sleeperApiService
      .getTransactions(leagueId, week)
      .pipe(
        take(1),
        tap((transactions) => {
          this.setTransactionsState({
            ...this.#transactions.value,
            [week]: transactions,
          });
          this.setLoadingState(false);
        }),
        catchError(() => {
          this.messageService.add({
            severity: 'warning',
            summary: 'Error',
            detail: 'Cannot fetch transactions. Please try again later.',
          });
          this.setTransactionsState({});
          this.setLoadingState(false);
          return of(null);
        })
      )
      .subscribe();
  }
}
