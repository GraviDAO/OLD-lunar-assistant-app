import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { Close } from '@material-ui/icons';
import { useWallet } from '@terra-money/wallet-provider';
import React from 'react';

const ConnectWallet = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    availableConnections,
    availableInstallTypes,
    connect,
    install,
    disconnect,
  } = useWallet();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <div
          style={{
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `center`,
            width: `100%`,
          }}
        >
          Connect Wallet
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <>
          {(() => {
            const connectTypes = availableConnections.filter(
              ({ type, identifier, name, icon }) => type === `EXTENSION`,
            );
            if (connectTypes.length > 0) {
              return connectTypes.map(({ type, identifier, name, icon }) => (
                <div key={`connect-${name}`}>
                  <Button
                    type="button"
                    style={{ width: `100%`, marginBottom: '20px' }}
                    onClick={() => {
                      connect(type);
                      setOpen(false);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    {`Connect ${name}`}
                  </Button>
                </div>
              ));
            }
            return (
              <Typography style={{ marginBottom: '20px' }}>
                Please Install the Terra Station Extension to Continue. Terra
                Station Mobile does not support signing transactions without
                posting them.
              </Typography>
            );
          })()}
        </>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWallet;
