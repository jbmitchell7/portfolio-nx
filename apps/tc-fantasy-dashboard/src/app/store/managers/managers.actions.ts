import { createAction, props } from '@ngrx/store';
import { Manager } from '@tc-fantasy-dashboard/shared/interfaces';

export const getManagersSuccess = createAction(
  '[Managers] getManagersSuccess',
  props<{ players: Manager[] }>()
);

export const getManagersFailure = createAction(
  '[Managers] getManagersFailure',
  props<{ error: string }>()
);

export const clearManagersData = createAction('[Manager] clearManagersData');
