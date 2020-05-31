import React, { ReactElement } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import * as firebaseui from 'firebaseui';
import { isEmpty, isLoaded, useFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

const Login = (): ReactElement | null => {
  const reduxFirebase = useFirebase();

  const auth = useSelector((state: RootState) => state.firebase.auth);

  console.log(firebase.auth, firebase);

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    callback: {
      signInSuccessUrl: console.log,
    },
  };

  return isLoaded(auth) && isEmpty(auth) ? (
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={reduxFirebase.auth()}
    />
  ) : null;
};

export default Login;
