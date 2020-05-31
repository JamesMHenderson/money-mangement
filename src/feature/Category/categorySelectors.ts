import { createSelector } from '@reduxjs/toolkit';
import {
  selectData,
  selectOrdered,
} from '../../app/firebase/firestoreSelectors';
import createCachedSelector from 're-reselect';
import { RootState } from '../../app/store';

export const selectCategories = createSelector(
  selectData,
  ({ category }) => category ?? {},
);

export const selectOrderedCategories = createSelector(
  selectOrdered,
  ({ category }) => category,
);

export const selectAllCategories = createSelector(
  selectOrderedCategories,
  (categories) => categories ?? [],
);

export const selectCategory = createCachedSelector(
  selectCategories,
  (_state: RootState, id: string) => id,
  (categories, id) => categories[id],
)((_state: RootState, id: string) => id);
