import { Manager } from "./manager";
import { Player } from "./roster";

export interface Transaction {
  status: string;
  type: TransactionType;
  settings: { waiver_bid: number } | null;
  leg: number; // week number
  draft_picks: DraftPick[];
  creator: string;
  transaction_id: string;
  adds: { [key: number]: number } | null; // key is player id, value is roster id
  drops: { [key: number]: number } | null;
  roster_ids: number[];
  waiver_budget: WaiverBudget[]; //used for trade involving faab
}

export interface DraftPick {
  round: number;
  season: string;
  league_id: null;
  roster_id: number;
  owner_id: number;
  previous_owner_id: number;
}

interface WaiverBudget {
  sender: number,
  receiver: number,
  amount: number
}

export enum TransactionType {
  FREE_AGENT = 'free_agent',
  WAIVER = 'waiver',
  TRADE = 'trade'
}

export interface RosterMove {
  adds: Player[],
  drops: Player[],
  manager: Manager | undefined,
  type: string,
  waiverBid?: number,
  picksAdded?: RosterMovePickAdded[]
}

export interface RosterMovePickAdded {
  round: string;
  season: string;
  originalManager?: Manager;
  pickNumber?: number;
}

