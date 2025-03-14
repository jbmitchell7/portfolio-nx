import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { SleeperApiService } from '../api-sleeper/sleeper-api.service';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {
  #isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.#isLoading.asObservable();

  constructor(
    protected readonly sleeperApiService: SleeperApiService,
    protected readonly messageService: MessageService
  ) {}

  setLoadingState(isLoading: boolean): void {
    this.#isLoading.next(isLoading);
  }
}