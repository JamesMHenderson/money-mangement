import firebase from 'firebase';
import { Month } from './BudgetTypes';
import { createSelector } from '@reduxjs/toolkit';
import { selectOrdered } from '../../app/firebase/firestoreSelectors';
import { isEmpty, isLoaded } from 'react-redux-firebase';

export const selectBudgets = createSelector(
  selectOrdered,
  ({ budget }) => budget,
);

export const selectAreBudgetsLoaded = createSelector(selectBudgets, (budgets) =>
  isLoaded(budgets),
);

export const selectAreBudgetsEmpty = createSelector(selectBudgets, (budgets) =>
  isEmpty(budgets),
);

export const selectBudget = createSelector(
  selectBudgets,
  selectAreBudgetsLoaded,
  selectAreBudgetsEmpty,
  (budgets = [], loaded, empty) =>
    loaded && !empty ? budgets?.[0] : undefined,
);

export const selectBudgetId = createSelector(
  selectBudget,
  (budget) => budget?.id,
);

export const selectBudgetTotal = createSelector(
  selectBudget,
  (budget) => budget?.total ?? 0,
);

export const selectPayees = createSelector(
  selectBudget,
  (budget) => budget?.payee ?? {},
);

export const selectMonth = (): Month => {
  return {
    date: firebase.firestore.Timestamp.fromDate(new Date(2020, 6)),
    budget: 'unknown',
    total: 9,
    category: {
      one: 2.0,
      two: 3.0,
      three: 4.0,
    },
  };
};
