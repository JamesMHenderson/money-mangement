import { AppState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { FirestoreReducer, TypeWithId } from 'react-redux-firebase';
import { Account } from '../../feature/Account';
import * as firebase from 'firebase';
import { Budget } from '../../feature/Budget/BudgetTypes';
import { Transaction } from '../../feature/Transaction/TransactionTypes';
import { Category } from '../../feature/Category/CategoryType';

type Schema = {
  account: Account;
  budget: Budget;
  category: Category;
  transaction: Transaction;
};

type Data<Schema extends Record<string, firebase.firestore.DocumentData>> = {
  [T in keyof Schema]?: Record<string, Schema[T]>;
};

type Ordered<Schema extends Record<string, firebase.firestore.DocumentData>> = {
  [T in keyof Schema]?: TypeWithId<Schema[T]>[];
};

const selectFirestore = ({ firestore }: AppState): FirestoreReducer.Reducer =>
  firestore;

export const selectData = createSelector(
  selectFirestore,
  ({ data }) => data as Data<Schema>,
);

export const selectOrdered = createSelector(
  selectFirestore,
  ({ ordered }) => ordered as Ordered<Schema>,
);
