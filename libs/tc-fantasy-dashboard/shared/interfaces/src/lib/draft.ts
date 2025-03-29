export interface Draft {
  type: string; // e.g., "snake"
  status: string; // e.g., "complete"
  start_time: number; // timestamp in milliseconds
  sport: string; // e.g., "nfl"
  settings: DraftSettings;
  season_type: string; // e.g., "regular"
  season: string; // e.g., "2017"
  metadata: DraftMetadata;
  league_id: string;
  draft_order: Record<string, number>; // user_id to draft slot mapping
  slot_to_roster_id: Record<string, number>; // draft slot to roster_id mapping
  draft_id: string;
}

export interface DraftSettings {
  teams: number;
  slots_wr: number;
  slots_te: number;
  slots_rb: number;
  slots_qb: number;
  slots_k: number;
  slots_flex: number;
  slots_def: number;
  slots_bn: number;
  rounds: number;
}

export interface DraftMetadata {
  scoring_type: string; // e.g., "ppr"
  name: string; // e.g., "My Dynasty"
  description: string; // optional, can be empty
}