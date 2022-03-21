import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Close } from "@material-ui/icons";
import { useWallet } from "@terra-money/wallet-provider";
import React from "react";
import Modal from "./shared/modal";

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
    <Modal open={open} handleClose={handleClose} title="Connect Wallet">
      <>
        {(() => {
          const connectTypes = availableConnections.filter(
            ({ type, identifier, name, icon }) =>
              type === `EXTENSION` || type === `WALLETCONNECT`
          );
          if (connectTypes.length > 0) {
            return connectTypes.map(({ type, identifier, name, icon }) => (
              <div key={`connect-${name}`}>
                <Button
                  type="button"
                  style={{ width: `100%`, marginBottom: "20px" }}
                  onClick={() => {
                    connect(type);
                    setOpen(false);
                  }}
                  variant="contained"
                  color="primary">
                  {`Connect ${
                    type === `EXTENSION` ? "Terra Station" : "Mobile"
                  } ${type === `EXTENSION` ? "(Free)" : "(Small Gas Fee)"}`}
                </Button>
              </div>
            ));
          }
          return (
            <Typography style={{ marginBottom: "20px" }}>
              Please Install the Terra Station Extension to Continue. Terra
              Station Mobile does not support signing transactions without
              posting them.
            </Typography>
          );
        })()}
      </>
    </Modal>
  );
};

export default ConnectWallet;
