import React, { ReactElement } from 'react';
import useBudget from './useBudget';
import Overview from './Overview';

const Budget = (): ReactElement => {
  useBudget();

  return (
    <>
      <Overview />
    </>
  );
};

export default Budget;
