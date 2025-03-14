import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
  clearRosterData,
  getRostersFailure,
  getRostersSuccess,
} from './rosters.actions';
import { createReducer, on } from '@ngrx/store';
import { initialDataInterfaceState, Roster, RosterState } from '@tc-fantasy-dashboard/shared/interfaces';

export const rosterAdapter: EntityAdapter<Roster> = createEntityAdapter<Roster>();

export const initialRosterState: RosterState = rosterAdapter.getInitialState({
  ...initialDataInterfaceState,
});

export const rostersReducer = createReducer(
  initialRosterState,
  on(getRostersSuccess, (state, action) => {
    const updatedRosters = action.rosters.map(r => ({
      ...r,
      id: r.owner_id
    }));
    const newState = rosterAdapter.addMany(updatedRosters, state);
    return {
      ...newState,
      isLoading: false,
      isLoaded: true,
      errorMessage: '',
    }
  }),
  on(getRostersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    errorMessage: action.error,
  })),
  on(clearRosterData, () => ({
    ...initialRosterState,
  })),
);
