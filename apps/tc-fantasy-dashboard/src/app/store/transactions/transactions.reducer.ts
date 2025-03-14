import { createReducer, on } from "@ngrx/store";
import { getTransactionsSuccess } from "./transactions.actions";
import { TransactionsState, initialDataInterfaceState } from "@tc-fantasy-dashboard/shared/interfaces";

export const initialTransactionsState: TransactionsState = {
  ...initialDataInterfaceState,
  transactions: {}
}

export const transactionsReducer = createReducer(
  initialTransactionsState,
  on(getTransactionsSuccess, (state, action) => ({
    ...state,
    transactions: {
      ...state.transactions,
      [action.week]: action.transactions
    }
  }))
);
