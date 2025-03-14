import { createAction, props } from '@ngrx/store';
import { Roster } from '@tc-fantasy-dashboard/shared/interfaces';

export const getRostersSuccess = createAction(
  '[Rosters] getRostersSuccess',
  props<{ rosters: Roster[], sport: string }>()
);

export const getRostersFailure = createAction(
  '[Rosters] getRostersFailure',
  props<{ error: string }>()
);

export const clearRosterData = createAction('[Roster] clearRosterData');
