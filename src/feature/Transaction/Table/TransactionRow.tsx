import React, { ReactElement } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { selectTransaction } from '../transactionSelectors';
import { selectCategory } from '../../Category/categorySelectors';

type TransactionRowProps = {
  id: string;
  accountId: string;
};

const TransactionRow = ({ id }: TransactionRowProps): ReactElement | null => {
  const transaction = useSelector((state: RootState) =>
    selectTransaction(state, id),
  );

  const { name: categoryName } =
    useSelector((state: RootState) =>
      selectCategory(state, transaction?.category ?? ''),
    ) ?? {};

  if (!transaction) return null;

  return (
    <TableRow>
      <TableCell>{transaction.date.toDate().toDateString()}</TableCell>
      <TableCell>{categoryName}</TableCell>
      <TableCell>{transaction.payee}</TableCell>
      <TableCell>{transaction.memo}</TableCell>
      <TableCell>{`£${transaction.value.toFixed(2)}`}</TableCell>
    </TableRow>
  );
};

export default TransactionRow;
