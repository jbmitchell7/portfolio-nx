import {
  AppState,
  StandingsData,
  Transaction,
} from '@tc-fantasy-dashboard/shared/interfaces';
import {
  getCurrentTransactionsWeek,
  getRosterMoves,
  getSeverity,
  getStreakIcon,
} from '@tc-fantasy-dashboard/shared/utils';

export const selectApp = (state: AppState) => state;

export const selectLeague = (state: AppState) => state.leagueData.league;

export const selectRosters = (state: AppState) => state.rosterData;

export const selectTransactions = (state: AppState) =>
  state.transactionsData.transactions;

export const selectAllPlayers = (state: AppState) => state.playerData;

export const selectStandingsData = (state: AppState) => {
  const data: StandingsData[] = [];
  Object.keys(state.rosterData.entities).forEach((key) => {
    const manager = state.managersData.entities[key];
    const roster = state.rosterData.entities[key];
    if (!!manager && !!roster) {
      const streak = roster.metadata?.streak;
      data.push({
        owner_id: roster.owner_id,
        playerIds: roster.players,
        username: manager.display_name,
        points: roster.settings.fpts,
        maxPoints: roster.settings.ppts,
        pointsAgainst: roster.settings.fpts_against,
        wins: roster.settings.wins,
        losses: roster.settings.losses,
        streak: streak,
        avatarUrl: manager.avatarUrl ?? '',
        streakColor: streak ? getSeverity(streak) : undefined,
        streakIcon: streak ? getStreakIcon(streak) : undefined,
      });
    }
  });
  return data;
};

export const selectCurrentWeekTransactions = (
  state: AppState
): Transaction[] => {
  const currentWeek = getCurrentTransactionsWeek(state.leagueData.league);
  const weeklyTransactions = state.transactionsData.transactions[currentWeek];
  if (!weeklyTransactions?.length) {
    return [];
  }
  return weeklyTransactions.map((t) => ({
    ...t,
    rosterMoves: getRosterMoves(t, state),
  }));
};
