import {
  DraftPick,
  League,
  Manager,
  Player,
  Roster,
  RosterMove,
  RosterMovePickAdded,
  Transaction,
} from '@tc-fantasy-dashboard/shared/interfaces';
import { nthNumber } from '../numbers/numbers';

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
    const moveData = getMoveData(league, t, id, manager);
    moves.push(moveData);
  });
  return moves;
};

const getMoveData = (
  league: League,
  transaction: Transaction,
  id: number,
  manager: Manager | undefined
): RosterMove => {
  const result: RosterMove = {
    adds: [] as Partial<Player>[],
    drops: [] as Partial<Player>[],
    manager,
    type: transaction.type,
    waiverBid: transaction.settings?.waiver_bid,
    picksAdded: []
  };
  if (transaction.adds !== null) {
    Object.keys(transaction.adds).forEach((key) => {
      if (transaction.adds?.[+key] === id) {
        result.adds.push(
          league.players?.[key] ?? ({ player_id: key } as Partial<Player>)
        );
      }
    });
  }
  if (transaction.drops !== null) {
    Object.keys(transaction.drops).forEach((key) => {
      if (transaction.drops?.[+key] === id) {
        result.drops.push(league.players?.[key] ?? { player_id: key });
      }
    });
  }
  if (transaction.draft_picks?.length) {
    result.picksAdded = getDraftPicksFromTransaction(league, transaction, manager?.user_id, id);
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

const getDraftPicksFromTransaction = (
  league: League,
  transaction: Transaction,
  userId: string | undefined,
  rosterId: number,
): RosterMovePickAdded[] => {
  const picks = [] as RosterMovePickAdded[];
  transaction.draft_picks.forEach((pick) => {
    let originalManager = {} as Manager;
    if (originalManager?.user_id !== userId) {
      originalManager = getManager(league, pick.roster_id) ?? {} as Manager;
    }
    if (pick.owner_id === rosterId) {
      let pickNumber = 0;
      if (league.season === pick.season) {
        const id = originalManager?.user_id ?? userId;
        pickNumber = league.draft?.draft_order[id ?? 'notAvailable'] ?? 0;
      }
      const numberPredicate = getPickPredicate(pick, pickNumber, league.season === pick.season);
      picks.push({
        round: `${pick.round}${numberPredicate}`,
        season: pick.season,
        pickNumber,
        originalManager: originalManager ?? ({} as Manager)
      });
    }
  });
  return picks;
}

const getPickPredicate = (pick: DraftPick, pickNumber: number, currentSeason = false): string => {
  if (!currentSeason || pickNumber === 0) {
    return nthNumber(pick.round);
  }
  if (pickNumber < 10) {
    return `.0${pickNumber}`;
  }
  return `.${pickNumber}`;
}
