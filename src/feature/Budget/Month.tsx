import React, { ReactElement } from 'react';
import { Card, Container, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectMonth } from './budgetSelectors';
import { format } from 'date-fns';

const Month = (): ReactElement => {
  const month = useSelector(selectMonth);

  return (
    <div>
      <Card>
        <Typography variant="h3">
          {format(month.date.toDate(), 'MMMM yy')}
        </Typography>
        <Typography>{`Total: £${month.total.toFixed(2)}`}</Typography>
      </Card>
      <Container>
        {Object.entries(month.category).map(([key, value]) => (
          <Typography key={key}>{`${key} : £${value.toFixed(2)}`}</Typography>
        ))}
      </Container>
    </div>
  );
};

export default Month;
