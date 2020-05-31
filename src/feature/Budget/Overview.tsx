import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectBudget } from './budgetSelectors';
import { Card, Typography } from '@material-ui/core';

const Overview = (): ReactElement => {
  const budget = useSelector(selectBudget);

  return (
    <Card>
      <Typography variant="h3">Budget</Typography>
      <Typography variant="h3">{budget?.name}</Typography>
      <Typography>{`£${budget?.total?.toFixed(2)}`}</Typography>
    </Card>
  );
};

export default Overview;
