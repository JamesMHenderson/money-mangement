import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectAccountById } from './accountSelectors';
import { Button, Card, Typography } from '@material-ui/core';
import { useFirestore } from 'react-redux-firebase';
import TransactionTable from '../Transaction/TransactionTable';

type AccountProps = {
  accountId: string;
};

const Account = ({ accountId }: AccountProps): ReactElement => {
  const account = useSelector((state: RootState) =>
    selectAccountById(state, accountId),
  );

  const firestore = useFirestore();

  if (!account) return <></>;

  return (
    <>
      <Card>
        <Typography variant="h3">{account.name}</Typography>
        <Typography>{account.description}</Typography>
        <Typography>{`£${account.balance.toFixed(2)}`}</Typography>
        <Button onClick={() => firestore.delete(`account/${accountId}`)}>
          Delete
        </Button>
      </Card>
      <TransactionTable accountId={accountId} />
    </>
  );
};

export default Account;
