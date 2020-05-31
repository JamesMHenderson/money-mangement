import React, { ReactElement } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@material-ui/core';
import TransactionForm from './TransactionForm';
import DialogTitle from '../../components/Dialog/DialogTitle';

type TransactionDialogProps = {
  open: boolean;
  onClose: () => void;
  accountId?: string;
};

const TransactionDialog = ({
  open,
  onClose,
}: TransactionDialogProps): ReactElement => {
  return (
    <Dialog open={open} maxWidth={false} onClose={onClose}>
      <DialogTitle onClose={onClose}>
        <Typography>Add Transaction</Typography>
      </DialogTitle>
      <DialogContent>
        <TransactionForm />
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="transaction-form">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDialog;
