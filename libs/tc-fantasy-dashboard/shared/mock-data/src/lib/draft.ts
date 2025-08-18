import { Draft, TradedPick } from "@tc-fantasy-dashboard/shared/interfaces";

export const mockDraft: Draft = {
  type: "",
  status: "",
  start_time: 0,
  sport: "",
  settings: {
    teams: 0,
    slots_wr: 0,
    slots_te: 0,
    slots_rb: 0,
    slots_qb: 0,
    slots_k: 0,
    slots_flex: 0,
    slots_def: 0,
    slots_bn: 0,
    rounds: 0
  },
  season_type: "",
  season: "",
  metadata: {
    scoring_type: "",
    name: "",
    description: ""
  },
  league_id: "",
  draft_order: {},
  slot_to_roster_id: {},
  draft_id: ""
};

export const mockTradedPick: TradedPick = {
  round: 1,
  roster_id: 1,
  owner_id: 2,
  season: "2025",
  previous_owner_id: 0
};
