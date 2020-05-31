import React, { ReactElement, ReactNode } from 'react';
import * as firebase from 'firebase/app';
import store from '../store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { createFirestoreInstance } from 'redux-firestore';
import FirebaseData from './FirebaseData';

type FirebaseType = {
  children: ReactNode;
};

const firebaseConfig = {
  apiKey: 'AIzaSyBgTSvGPp7mZQApo28Uy58ejP-KB2EQaaE',
  authDomain: 'money-management-64120.firebaseapp.com',
  databaseURL: 'https://money-management-64120.firebaseio.com',
  projectId: 'money-management-64120',
  storageBucket: 'money-management-64120.appspot.com',
  messagingSenderId: '1038904800826',
  appId: '1:1038904800826:web:7bfd2ecf74a134673fe703',
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});

firebase.firestore().enablePersistence();
firebase.firestore().disableNetwork();

export const firestore = firebase.firestore();

const rrfConfig = {
  userProfile: 'user',
  useFirestoreForProfile: true,
};

const Firebase = ({ children }: FirebaseType): ReactElement => (
  <ReactReduxFirebaseProvider
    firebase={firebase}
    config={rrfConfig}
    dispatch={store.dispatch}
    createFirestoreInstance={createFirestoreInstance}
  >
    <FirebaseData>{children}</FirebaseData>
  </ReactReduxFirebaseProvider>
);

export default Firebase;
