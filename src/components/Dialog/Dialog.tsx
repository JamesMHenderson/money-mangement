import React, { ReactElement, ReactNode } from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import { DialogActions, DialogTitle } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';

type ModalProps = {
  onClose: () => void;
  open: boolean;
  actions: ReactNode;
  title: ReactNode;
  content: ReactNode;
};

const Dialog = ({
  open,
  onClose,
  actions,
  content,
  title,
}: ModalProps): ReactElement => {
  return (
    <MuiDialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
      {actions && <DialogActions>{actions}</DialogActions>}
    </MuiDialog>
  );
};

export default Dialog;
