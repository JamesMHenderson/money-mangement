import React, { ReactElement } from 'react';
import { isLoaded } from 'react-redux-firebase';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import useTransactions from './useTransactions';
import TransactionDialog from './TransactionDialog';
import { useBoolean } from '../../hooks';
import IconButton from '@material-ui/core/IconButton';
import { AddCircle } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectAccountTransactionIds } from './transactionSelectors';
import { RootState } from '../../app/store';
import TransactionRow from './Table/TransactionRow';

type TransactionTableProps = {
  accountId: string;
};

const TransactionTable = ({
  accountId,
}: TransactionTableProps): ReactElement => {
  const {
    value: isDialogOpen,
    setTrue: openDialog,
    setFalse: closeDialog,
  } = useBoolean();

  const { transactions } = useTransactions(accountId);

  const transactionIds = useSelector((state: RootState) =>
    selectAccountTransactionIds(state, accountId),
  );

  if (!isLoaded(transactions)) {
    return <div>Loading...</div>;
  }

  console.log(transactions);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Payee</TableCell>
            <TableCell>Memo</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionIds?.map((id) => (
            <TransactionRow key={id} id={id} accountId={accountId} />
          ))}
        </TableBody>
      </Table>
      <IconButton onClick={openDialog}>
        <AddCircle />
      </IconButton>
      <TransactionDialog
        open={isDialogOpen}
        onClose={closeDialog}
        accountId={accountId}
      />
    </TableContainer>
  );
};

export default TransactionTable;
