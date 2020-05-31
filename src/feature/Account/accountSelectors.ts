import createCachedSelector from 're-reselect';
import { createSelector } from '@reduxjs/toolkit';
import {
  selectData,
  selectOrdered,
} from '../../app/firebase/firestoreSelectors';
import { RootState } from '../../app/store';
import { isLoaded } from 'react-redux-firebase';

export const selectAccounts = createSelector(
  selectData,
  ({ account }) => account,
);

export const selectAreAccountsLoaded = createSelector(selectAccounts, isLoaded);

export const selectAccountIds = createSelector(selectAccounts, (accounts) => {
  if (!accounts) return [];
  return Object.keys(accounts);
});

export const selectAccountById = createCachedSelector(
  selectAccounts,
  (_state: RootState, id: string) => id,
  (accounts, id) => {
    const account = accounts?.[id];
    return isLoaded(account) ? account : undefined;
  },
)((_state, id) => id);

export const selectOrderedAccounts = createSelector(
  selectOrdered,
  ({ account }) => account ?? [],
);
