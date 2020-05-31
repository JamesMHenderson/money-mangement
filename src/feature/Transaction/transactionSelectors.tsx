import createCachedSelector from 're-reselect';
import { RootState } from '../../app/store';
import {
  selectOrdered,
  selectData,
} from '../../app/firebase/firestoreSelectors';
import { createSelector } from '@reduxjs/toolkit';

const selectAccountId = (_state: RootState, accountId: string) => accountId;

export const selectOrderedTransactions = createSelector(
  selectOrdered,
  ({ transaction }) => transaction,
);

export const selectTransactions = createSelector(
  selectData,
  selectAccountId,
  (data) => data.transaction,
);

export const selectAccountTransactions = createCachedSelector(
  selectOrderedTransactions,
  selectAccountId,
  (transactions, accountId) =>
    transactions?.filter(({ account }) => account === accountId),
)(selectAccountId);

export const selectAccountTransactionIds = createCachedSelector(
  selectAccountTransactions,
  (transactions) => transactions?.map(({ id }) => id),
)(selectAccountId);

export const selectTransaction = createCachedSelector(
  selectTransactions,
  (state: RootState, transactionId: string) => transactionId,
  (transactions, transactionId) => transactions?.[transactionId],
)((state: RootState, transactionId: string) => transactionId);
