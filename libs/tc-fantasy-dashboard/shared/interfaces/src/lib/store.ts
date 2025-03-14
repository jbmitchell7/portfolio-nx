import { EntityState } from '@ngrx/entity';
import { Transaction } from './transactions';
import { Roster, Player } from './roster';
import { League } from './league';
import { LeagueUser } from './leagueuser';

export interface DataInterface {
  isLoading: boolean;
  isLoaded: boolean;
  errorMessage: string;
}

export const initialDataInterfaceState: DataInterface = {
  isLoading: false,
  isLoaded: false,
  errorMessage: '',
};

export interface AppState {
  playerData: PlayersState;
  leagueData: LeagueState;
  rosterData: RosterState;
  managersData: ManagerState;
  transactionsData: TransactionsState;
}

export interface TransactionsState extends DataInterface {
  transactions: {[key: number]: Transaction[]}
}

export interface RosterState extends DataInterface, EntityState<Roster> {}

export interface PlayersState extends DataInterface, EntityState<Player> {}

export interface ManagerState extends DataInterface, EntityState<LeagueUser> {}

export interface LeagueState extends DataInterface {
  league: League;
}
