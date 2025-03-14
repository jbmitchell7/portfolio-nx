import { createReducer, on } from "@ngrx/store";
import { getPlayersFailure, getPlayersRequest, getPlayersSuccess } from "./players.actions";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { initialDataInterfaceState, Player, PlayersState } from "@tc-fantasy-dashboard/shared/interfaces";

export const playersAdapter: EntityAdapter<Player> = createEntityAdapter<Player>();

export const initialPlayersState: PlayersState = playersAdapter.getInitialState({
  ...initialDataInterfaceState
});

export const playersReducer = createReducer(
  initialPlayersState,
  on(getPlayersRequest, (state) => ({
    ...state,
    isLoading: true,
    isLoaded: false
  })),
  on(getPlayersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    errorMessage: action.error,
  })),
  on(getPlayersSuccess, (state, action) => {
    const playersToAdd = action.players.map(p => ({
      ...p,
      id: p.player_id
    }));
    const playersState = playersAdapter.upsertMany(playersToAdd, state);
    return {
      ...playersState,
      isLoading: false,
      isLoaded: true,
      errorMessage: ''
    }
  })
)