import { AppState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { isEmpty, isLoaded } from 'react-redux-firebase';

const selectFirebase = ({ firebase }: AppState) => firebase;

export const selectAuth = createSelector(selectFirebase, ({ auth }) => auth);

export const selectIsAuthLoaded = createSelector(selectAuth, (auth) =>
  isLoaded(auth),
);

export const selectIsAuthEmpty = createSelector(selectAuth, (auth) =>
  isEmpty(auth),
);

export const selectAuthUid = createSelector(selectAuth, ({ uid }) => uid);
