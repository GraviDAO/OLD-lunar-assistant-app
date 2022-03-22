import React from 'react';
import T from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import styles from './modal.module.scss';

type IProps = {
  open: boolean;
  handleClose: () => void;
  children: any;
  title: string;
};

function Modal(props: IProps) {
  const { open, handleClose, title, children } = props;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={styles.customModal}
      >
        <DialogTitle id="form-dialog-title">
          <div
            style={{
              display: `flex`,
              justifyContent: `end`,
              alignItems: `center`,
              width: `100%`,
            }}
          >
            <IconButton
              className={styles.closeBtn}
              onClick={handleClose}
              color="primary"
            >
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className={styles.title}>{title}</div>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}

Modal.propTypes = {
  open: T.bool,
  handleClose: T.func,
};

export default Modal;
