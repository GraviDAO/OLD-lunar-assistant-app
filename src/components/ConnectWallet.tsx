import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '@material-ui/icons';
import { useWallet } from '@terra-money/wallet-provider';
import React from 'react';

const ConnectWallet = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const {
    status,
    network,
    wallets,
    availableConnectTypes,
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
            const connectTypes = availableConnectTypes.filter((connectType) =>
              [`CHROME_EXTENSION`, 'WALLETCONNECT'].includes(connectType),
            );
            if (connectTypes.length > 0) {
              return connectTypes.map((connectType) => (
                <div>
                  <Button
                    type="button"
                    key={`connect-${connectType}`}
                    style={{ width: `100%`, marginBottom: '20px' }}
                    onClick={() => {
                      connect(connectType);
                      setOpen(false);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Connect{` `}
                    {connectType === `CHROME_EXTENSION`
                      ? `Terra Station Extension`
                      : `Terra Station Mobile`}
                  </Button>
                </div>
              ));
            }
            return (
              <p className="p-4 border-4 border-current max-w-md text-3xl text-center dark:text-white mt-10">
                Please Install the Terra Station Extension to Continue
              </p>
            );
          })()}
        </>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWallet;
