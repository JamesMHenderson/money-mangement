import React, { ReactElement } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@material-ui/core';
import DialogTitle from 'components/Dialog/DialogTitle';
import CategoryForm from './CategoryForm';

type CategoryFormProps = {
  open: boolean;
  initialValue: string;
  onClose: () => void;
  onAdd?: (id: string, name: string) => void;
};

const CategoryDialog = ({
  open,
  onClose,
  onAdd,
  initialValue,
}: CategoryFormProps): ReactElement => {
  return (
    <Dialog open={open} maxWidth={false} onClose={onClose}>
      <DialogTitle onClose={onClose}>
        <Typography>Add Category</Typography>
      </DialogTitle>
      <DialogContent>
        <CategoryForm onAdd={onAdd} initialValue={initialValue} />
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="category-form">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDialog;
