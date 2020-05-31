import React from 'react';
import { setPage } from '../../page/pageSlice';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { useDispatch, useSelector } from 'react-redux';
import { selectBudgetTotal } from './budgetSelectors';

const BudgetMenuItem = () => {
  const dispatch = useDispatch();
  const total = useSelector(selectBudgetTotal);

  return (
    <ListItem
      button
      onClick={() =>
        dispatch(
          setPage({
            page: 'budget',
            objectId: '',
          }),
        )
      }
    >
      <ListItemIcon>
        <MonetizationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Budget" secondary={`£${total.toFixed(2)}`} />
    </ListItem>
  );
};

export default BudgetMenuItem;
