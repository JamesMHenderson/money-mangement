import React, { ReactElement, ReactNode } from 'react';
import MuiDialogTitle, {
  DialogTitleProps as MuiDialogTitleProps,
} from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import styles from './resources/styles/dialogTitle.module.scss';

interface DialogTitleProps extends MuiDialogTitleProps {
  children: ReactNode;
  onClose?: () => void;
}

const DialogTitle = (props: DialogTitleProps): ReactElement => {
  const { children, onClose, ...other } = props;

  return (
    <MuiDialogTitle {...other}>
      {children}
      {onClose && (
        <IconButton
          className={styles.close}
          aria-label="close"
          onClick={onClose}
        >
          <Close />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
};

export default DialogTitle;
