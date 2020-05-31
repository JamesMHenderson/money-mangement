import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectAccountById } from '../Account/accountSelectors';
import { setPage } from '../../page/pageSlice';
import { ListItem, ListItemText } from '@material-ui/core';

type AccountItemProps = {
  accountId: string;
};

const AccountItem = ({ accountId }: AccountItemProps): ReactElement | null => {
  const dispatch = useDispatch();

  const account = useSelector((state: RootState) =>
    selectAccountById(state, accountId),
  );

  if (!account) return null;

  return (
    <ListItem
      button
      onClick={() =>
        dispatch(setPage({ page: 'account', objectId: accountId }))
      }
    >
      <ListItemText
        primary={account.name}
        secondary={`£${account.balance.toFixed(2)}`}
      />
    </ListItem>
  );
};

export default AccountItem;
