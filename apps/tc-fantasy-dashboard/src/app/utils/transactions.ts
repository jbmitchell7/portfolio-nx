import { AppState } from "../store/global.selectors";
import { PlayersState } from "../store/players/players.reducer";
import { League, LeagueUser, Player, RosterMove, Transaction } from '@tc-fantasy-dashboard/shared/interfaces'

export const getCurrentTransactionsWeek = (l: League): number => {
  const status = l.status;
  if (status === 'complete') {
    return 18;
  }
  if (status === 'pre_draft') {
    return 1;
  }
  return l.sportState.week;
}

export const getRosterMoves = (t: Transaction, state: AppState) => {
  const moves = [] as RosterMove[];
  t.roster_ids.forEach(id => {
    const manager = getManager(state, id);
    const moveData = getMoveData(state.playerData, t, id, manager)
    moves.push(moveData);
  });
  return moves;
};

const getMoveData = (state: PlayersState, transaction: Transaction, id: number, manager: LeagueUser | undefined): RosterMove => {
  const result = {
    adds: [] as Partial<Player>[],
    drops: [] as Partial<Player>[],
    manager,
    type: transaction.type,
    waiverBid: transaction.settings?.waiver_bid
  };
  if (transaction.adds !== null) {
    Object.keys(transaction.adds).forEach((key) => {
      if (transaction.adds?.[+key] === id) {
        result.adds.push(state.entities[key] ?? { player_id: key } as Partial<Player>);
      }
    })
  }
  if (transaction.drops !== null) {
    Object.keys(transaction.drops).forEach((key) => {
      if (transaction.drops?.[+key] === id) {
        result.drops.push(state.entities[key] ?? { player_id: key });
      }
    })
  }
  return result;
};

const getManager = (state: AppState, rosterId: number): LeagueUser | undefined => {
  const managerId = Object
    .keys(state.rosterData.entities)
    .find(key => state.rosterData.entities[key]?.roster_id === rosterId);
  return managerId ? state.managersData.entities[managerId] : undefined;
};