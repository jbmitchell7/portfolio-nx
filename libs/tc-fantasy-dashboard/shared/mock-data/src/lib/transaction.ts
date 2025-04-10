import { Transaction, TransactionType } from "@tc-fantasy-dashboard/shared/interfaces";

export const mockTransaction: Transaction = {
  status: "",
  type: TransactionType.FREE_AGENT,
  settings: null,
  leg: 0,
  draft_picks: [],
  creator: "",
  transaction_id: "",
  adds: {
    1: 123
  },
  drops: null,
  roster_ids: [123],
  waiver_budget: []
}