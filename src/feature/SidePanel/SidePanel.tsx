import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
} from '@material-ui/core';
import { setPage } from 'page/pageSlice';
import styles from './resources/styles/sidePanel.module.scss';
import {
  ExpandLess,
  ExpandMore,
  AccountBalance,
  Add,
} from '@material-ui/icons';
import AccountItem from './AccountItem';
import { useBoolean } from '../../hooks';
import BudgetMenuItem from '../Budget/BudgetMenuItem';
import { useAccounts } from '../Account/useAccount';

const SidePanel = (): ReactElement => {
  const dispatch = useDispatch();

  const { allIds: accountIds } = useAccounts();

  const { value: isAccountsOpen, toggle: toggleAccounts } = useBoolean(false);

  return (
    <Drawer variant="permanent" className={styles.container}>
      <List>
        <BudgetMenuItem />
        <ListItem button onClick={toggleAccounts}>
          <ListItemIcon>
            <AccountBalance />
          </ListItemIcon>
          <ListItemText primary="Accounts" />
          {isAccountsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={isAccountsOpen} timeout="auto" unmountOnExit>
          <List component="div">
            {accountIds?.map((accountId) => (
              <AccountItem key={accountId} accountId={accountId} />
            ))}
          </List>
        </Collapse>
        <ListItem
          button
          onClick={() =>
            dispatch(
              setPage({
                page: 'account/add',
                objectId: '',
              }),
            )
          }
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Add Account" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SidePanel;
