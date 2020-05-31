import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import {
  FirebaseReducer,
  firebaseReducer,
  FirestoreReducer,
} from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { pageReducer } from 'page/pageSlice';

export type RootState = {
  firebase: FirebaseReducer.Reducer;
  firestore: FirestoreReducer.Reducer;
  page: ReturnType<typeof pageReducer>;
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  page: pageReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
