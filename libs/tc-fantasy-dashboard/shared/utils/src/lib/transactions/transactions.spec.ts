import { getCurrentTransactionsWeek, getRosterMoves } from './transactions';
import { League, Manager, Roster, Transaction } from '@tc-fantasy-dashboard/shared/interfaces';

describe('getCurrentTransactionsWeek', () => {
  it('should return 18 if the league status is "complete"', () => {
    const league: League = {
      status: 'complete',
      sportState: { week: 10 },
    } as League;

    expect(getCurrentTransactionsWeek(league)).toBe(18);
  });

  it('should return 1 if the league status is "pre_draft"', () => {
    const league: League = {
      status: 'pre_draft',
      sportState: { week: 10 },
    } as League;

    expect(getCurrentTransactionsWeek(league)).toBe(1);
  });

  it('should return the current week from sportState if the league status is neither "complete" nor "pre_draft"', () => {
    const league: League = {
      status: 'in_progress',
      sportState: { week: 5 },
    } as League;

    expect(getCurrentTransactionsWeek(league)).toBe(5);
  });

  it('should return 0 if sportState is undefined', () => {
    const league: League = {
      status: 'in_progress',
    } as League;

    expect(getCurrentTransactionsWeek(league)).toBe(0);
  });
});

describe('getRosterMoves', () => {
  it('should return an empty array if no roster_ids are present in the transaction', () => {
    const league: League = {
      players: {},
      rosters: {},
      managers: {},
    } as League;

    const transaction = {
      roster_ids: [],
    } as unknown as Transaction;

    expect(getRosterMoves(transaction, league)).toEqual([]);
  });

  it('should return correct roster moves for adds and drops', () => {
    const league: League = {
      players: {
        '1': { player_id: '1', name: 'Player 1' },
        '2': { player_id: '2', name: 'Player 2' },
      },
      rosters: {
        123: { roster_id: 123, owner_id: '1' } as Roster,
      },
      managers: {
        '1': { manager_id: 1, name: 'Manager 1', roster_id: 123 } as unknown as Manager,
      },
    } as unknown as League;

    const transaction = {
      roster_ids: [1],
      adds: { '1': 1 },
      drops: { '2': 1 },
      type: 'trade',
      settings: { waiver_bid: 100 },
    } as unknown as Transaction;

    const result = getRosterMoves(transaction, league);

    expect(result).toEqual([
      {
        adds: [{ player_id: '1', name: 'Player 1' }],
        drops: [{ player_id: '2', name: 'Player 2' }],
        manager: { manager_id: 1, name: 'Manager 1' },
        type: 'trade',
        picksAdded: [],
        waiverBid: 100,
      },
    ]);
  });

  it('should handle missing players in adds or drops gracefully', () => {
    const league: League = {
      players: {},
      rosters: {
        '1': { roster_id: 1 } as Roster,
      },
      managers: {
        '1': { manager_id: 1, name: 'Manager 1' } as unknown as Manager,
      },
    } as unknown as League;

    const transaction = {
      roster_ids: [1],
      adds: { '3': 1 },
      drops: { '4': 1 },
      type: 'waiver',
      settings: { waiver_bid: 50 },
    } as unknown as Transaction;

    const result = getRosterMoves(transaction, league);

    expect(result).toEqual([
      {
        adds: [{ player_id: '3' }],
        drops: [{ player_id: '4' }],
        manager: { manager_id: 1, name: 'Manager 1' },
        type: 'waiver',
        picksAdded: [],
        waiverBid: 50,
      },
    ]);
  });
});

