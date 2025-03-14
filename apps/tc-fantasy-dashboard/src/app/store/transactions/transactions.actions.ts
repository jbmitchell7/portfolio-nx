import { createAction, props } from "@ngrx/store";
import { Transaction } from "@tc-fantasy-dashboard/shared/interfaces";

export const getTransactionsRequest = createAction(
  '[Transactions] getTransactionsRequest',
  props<{leagueId: string; week: number}>()
);
  
export const getTransactionsSuccess = createAction(
  '[Transactions] getTransactionsSuccess',
  props<{week: number, transactions: Transaction[]}>()
);

export const getTransactionsFailure = createAction(
  '[Transactions] getTransactionsFailure',
  props<{ error: string }>()
);