import React, { ReactElement } from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Add from './Add';
import useFirestoreData from '../../app/firebase/useFirestoreData';
import useBudget from '../Budget/useBudget';

const Accounts = (): ReactElement => {
  useFirestoreData();

  const accounts = useSelector(
    (state: RootState) => state.firestore.ordered.account,
  );

  console.log(accounts);

  return (
    <div>
      <Add />
    </div>
  );
};

export default Accounts;
