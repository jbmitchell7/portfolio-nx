import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, take, tap } from 'rxjs';
import { DataService } from '../data/data.service';
import { Manager } from '@tc-fantasy-dashboard/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ManagerService extends DataService {
  #managers = new BehaviorSubject<Record<string, Manager>>({});

  get managers$(): Observable<Record<string, Manager>> {
    return this.#managers.asObservable();
  }

  setManagersState(managers: Record<string, Manager>): void {
    this.#managers.next(managers);
  }

  getManagers(leagueId: string): void {
    this.setLoadingState(true);
    this.sleeperApiService
      .getManagers(leagueId)
      .pipe(
        take(1),
        tap((managers) => {
          const managerRecords = this.#createManagerRecords(managers);
          this.setManagersState(managerRecords);
          this.setLoadingState(false);
        }),
        catchError(() => {            
          this.messageService.add({
            severity: 'warning',
            summary: 'Error',
            detail: 'Cannot fetch managers. Please try again later.'
          });
          this.setManagersState({});
          this.setLoadingState(false);
          return of(null);
        })
      ).subscribe();
  }

  #createManagerRecords(managers: Manager[]): Record<string, Manager> {
    const managersWithAvatars = this.#getManagerAvatars(managers);
    return managersWithAvatars.reduce((acc, manager) => {
      acc[manager.user_id] = manager;
      return acc;
    }, {} as Record<string, Manager>);
  }

  #getManagerAvatars(managers: Manager[]): Manager[] {
    const avatarUrl = 'https://sleepercdn.com/avatars/thumbs';
    const defaultAvatar ='4f4090e5e9c3941414db40a871e3e909';
    return managers.map(p => ({
      ...p,
      avatarUrl: `${avatarUrl}/${p.avatar ?? defaultAvatar}`,
      id: p.user_id
    }));
  }
}