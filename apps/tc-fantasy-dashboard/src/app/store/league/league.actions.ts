import { createAction, props } from '@ngrx/store';
import { League } from '@tc-fantasy-dashboard/shared/interfaces';

export const getLeagueSuccess = createAction(
  '[League] getLeagueSuccess',
  props<{ league: League }>()
);

export const getLeagueFailure = createAction(
  '[League] getLeagueFailure',
  props<{ error: string }>()
);

export const clearLeagueData = createAction('[League] clearLeagueData');
