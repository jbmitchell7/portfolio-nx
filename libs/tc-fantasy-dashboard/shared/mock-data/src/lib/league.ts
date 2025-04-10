import { League, LeagueResponse } from '@tc-fantasy-dashboard/shared/interfaces';
import { mockRoster } from './roster';
import { mockManager } from './manager';
import { mockSportState } from './sportState';

export const mockLeagueResponse: LeagueResponse = {
  status: 'complete',
  previous_league_id: '',
  league_id: '12345',
  name: 'Mock League',
  season: '2023',
  total_rosters: 10,
  sport: 'nfl',
  settings: {
    max_keepers: 0,
    draft_rounds: 0,
    taxi_years: 0,
    waiver_clear_days: 0,
    waiver_day_of_week: 0,
    start_week: 0,
    playoff_teams: 0,
    reserve_slots: 0,
    daily_waivers_hour: 0,
    waiver_budget: 0,
    offseason_adds: 0,
    playoff_week_start: 0,
    trade_deadline: 0,
    taxi_slots: 0
  },
  draft_id: '',
  scoring_settings: {
    pass_2pt: 2,
    pass_int: -2,
    fgmiss: -1,
    rec_yd: 0.1,
    xpmiss: 0,
    fgm_30_39: 0,
    blk_kick: 0,
    pts_allow_7_13: 0,
    ff: 0,
    fgm_20_29: 0,
    fgm_40_49: 0,
    pts_allow_1_6: 0,
    st_fum_rec: 0,
    def_st_ff: 0,
    st_ff: 0,
    bonus_rec_te: 0,
    pts_allow_28_34: 0,
    fgm_50p: 0,
    fum_rec: 0,
    def_td: 0,
    fgm_0_19: 0,
    int: 0,
    pts_allow_0: 0,
    pts_allow_21_27: 0,
    rec_2pt: 0,
    rec: 0,
    xpm: 0,
    st_td: 0,
    def_st_fum_rec: 0,
    def_st_td: 0,
    sack: 0,
    fum_rec_td: 0,
    rush_2pt: 0,
    rec_td: 0,
    pts_allow_35p: 0,
    pts_allow_14_20: 0,
    rush_yd: 0,
    pass_yd: 0,
    pass_td: 0,
    rush_td: 0,
    fum_lost: 0,
    fum: 0,
    safe: 0
  },
  season_type: '',
  roster_positions: [],
  metadata: {
    latest_league_winner_roster_id: '',
    keeper_deadline: ''
  },
  avatar: null
};

export const mockLeague: League = {
  ...mockLeagueResponse,
  rosters: {
    '123': mockRoster
  },
  managers: {
    '123': mockManager
  },
  sportState: mockSportState
};