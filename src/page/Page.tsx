import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectPageState } from './pageSlice';
import Account from '../feature/Account/Account';

import styles from './resources/styles/page.module.scss';
import { Container } from '@material-ui/core';
import Add from '../feature/Account/Add';
import Budget from '../feature/Budget/Budget';
import Login from '../feature/Login/Login';
import { RootState } from '../app/store';
import { isEmpty, isLoaded } from 'react-redux-firebase';

const Page = (): ReactElement => {
  const { page, objectId } = useSelector(selectPageState);

  const auth = useSelector((state: RootState) => state.firebase.auth);

  if (isLoaded(auth) && isEmpty(auth)) {
    return <Login />;
  } else if (!isLoaded(auth)) {
    return <></>;
  }

  let component = <Budget />;

  switch (page) {
    case 'account':
      if (!objectId) break;
      component = <Account accountId={objectId} />;
      break;
    case 'account/add':
      component = <Add />;
      break;
    case 'budget':
      component = <Budget />;
  }

  return (
    <Container component="main" className={styles.container}>
      {component}
    </Container>
  );
};

export default Page;
