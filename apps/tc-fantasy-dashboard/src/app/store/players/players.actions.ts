import { createAction, props } from "@ngrx/store";
import { Player } from "@tc-fantasy-dashboard/shared/interfaces";

export const getPlayersRequest = createAction(
  '[Players] getPlayersRequest',
  props<{sport: string; ids: string[] }>()
);

export const getPlayersSuccess = createAction(
  '[Players] getPlayersSuccess',
  props<{players: Player[] }>()
);

export const getPlayersFailure = createAction(
  '[Players] getPlayersFailure',
  props<{ error: string }>()
);
