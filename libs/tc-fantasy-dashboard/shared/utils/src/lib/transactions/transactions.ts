import {
  League,
  Manager,
  Player,
  Roster,
  RosterMove,
  Transaction,
} from '@tc-fantasy-dashboard/shared/interfaces';

export const getCurrentTransactionsWeek = (l: League): number => {
  const status = l.status;
  if (status === 'complete') {
    return 18;
  }
  if (status === 'pre_draft') {
    return 1;
  }
  return l.sportState?.week ?? 0;
};

export const getRosterMoves = (t: Transaction, league: League) => {
  const moves = [] as RosterMove[];
  t.roster_ids.forEach((id) => {
    const manager = getManager(league, id);
    const moveData = getMoveData(league.players ?? {}, t, id, manager);
    moves.push(moveData);
  });
  return moves;
};

const getMoveData = (
  players: Record<string, Player>,
  transaction: Transaction,
  id: number,
  manager: Manager | undefined
): RosterMove => {
  const result = {
    adds: [] as Partial<Player>[],
    drops: [] as Partial<Player>[],
    manager,
    type: transaction.type,
    waiverBid: transaction.settings?.waiver_bid,
  };
  if (transaction.adds !== null) {
    Object.keys(transaction.adds).forEach((key) => {
      if (transaction.adds?.[+key] === id) {
        result.adds.push(
          players[key] ?? ({ player_id: key } as Partial<Player>)
        );
      }
    });
  }
  if (transaction.drops !== null) {
    Object.keys(transaction.drops).forEach((key) => {
      if (transaction.drops?.[+key] === id) {
        result.drops.push(players[key] ?? { player_id: key });
      }
    });
  }
  return result;
};

const getManager = (
  league: League,
  rosterId: number
): Manager | undefined => {
  const managerId = Object
    .keys(league.rosters as Record<string, Roster>)
    .find((key) => league.rosters?.[key]?.roster_id === rosterId);
  return managerId ? league.managers?.[managerId] : undefined;
};
