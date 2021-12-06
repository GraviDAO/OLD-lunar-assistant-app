import { LunarApi } from '@/services/LunarApi';
import {
  LunarLinkPostRequest,
  LunarLinkSignRequest,
} from '@/shared/requestTypes';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Snackbar,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { Alert } from '@material-ui/lab';
import { Fee, MsgSend } from '@terra-money/terra.js';
import {
  CreateTxFailed,
  SignBytesFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  useConnectedWallet,
  UserDenied,
  useWallet,
  WalletStatus,
} from '@terra-money/wallet-provider';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ConnectWallet from './ConnectWallet';

interface OnboardingCardProps {
  number: string;
  title: string;
  caption: string;
  buttonText: string;
  status: number;
  onClick: any;
}

const OnboardingCard = ({
  number,
  title,
  caption,
  buttonText,
  onClick,
  status,
}: OnboardingCardProps) => {
  const theme = useTheme<Theme>();

  const getColor = () =>
    status === 2
      ? '#5DB521'
      : status === 1
      ? theme.palette.primary.main
      : 'rgba(0, 0, 0, .25)';

  const getBorder = () =>
    status === 1 ? `2px solid ${getColor()}` : `2px solid ${getColor()}`;

  return (
    <Card
      elevation={4}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '50px',
        minHeight: '300px',
        border: getBorder(),
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          textAlign: 'center',
          fontSize: '32px',
          border: getBorder(),
          transform: 'translateY(-90px)',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: getColor(),
        }}
      >
        {status === 2 ? <CheckIcon fontSize="large" /> : number}
      </div>
      <Typography
        variant="h4"
        style={{ textAlign: 'center', fontWeight: 'bold' }}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        style={{ textAlign: 'center', fontSize: '24px' }}
      >
        {caption}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{
          visibility: buttonText !== '' ? 'visible' : 'hidden',
          fontSize: '20px',
          marginTop: '20px',
        }}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </Card>
  );
};

interface WelcomeCardsProps {
  hasPaymentMethods?: boolean;
  hasEmployees?: boolean;
  hasPerkGroup?: boolean;
}

const WelcomeCards = ({
  hasPaymentMethods = false,
  hasEmployees = false,
  hasPerkGroup = false,
}: WelcomeCardsProps) => {
  const [linkComplete, setLinkComplete] = useState(false);
  const {
    wallets,
    availableConnectTypes,
    availableInstallTypes,
    connect,
    status,
    install,
    disconnect,
  } = useWallet();
  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const connectedWallet = useConnectedWallet();
  const router = useRouter();
  const { jwt: jwtString } = router.query;

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <div style={{ margin: '100px 200px' }}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <OnboardingCard
            number="1"
            title="Connect Your Wallet"
            caption="Connect the wallet you want to link to your discord account."
            buttonText={
              status === WalletStatus.WALLET_CONNECTED
                ? 'Disconnect Wallet'
                : 'Connect Wallet'
            }
            status={status === WalletStatus.WALLET_CONNECTED ? 2 : 1}
            onClick={
              status === WalletStatus.WALLET_CONNECTED
                ? () => {
                    disconnect();
                  }
                : () => {
                    setOpen(true);
                  }
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <OnboardingCard
            number="2"
            title={
              connectedWallet?.connectType === 'EXTENSION'
                ? 'Sign A Transaction'
                : 'Post A Transaction'
            }
            caption={
              connectedWallet?.connectType === 'WALLETCONNECT'
                ? 'Sign a transaction that will prove ownership of your wallet. It will not cost you anything.'
                : 'Post a transaction that will prove ownership of your wallet. It will cost a small gas fee.'
            }
            buttonText={
              status === WalletStatus.WALLET_CONNECTED
                ? connectedWallet?.connectType === 'EXTENSION'
                  ? 'Sign Transaction'
                  : 'Post Transaction'
                : ''
            }
            status={
              linkComplete
                ? 2
                : status === WalletStatus.WALLET_CONNECTED
                ? 1
                : 0
            }
            onClick={async () => {
              console.log(connectedWallet?.connectType);
              if (
                connectedWallet &&
                connectedWallet.connectType === 'EXTENSION'
              ) {
                console.log('Signing transaction');

                let signBytesResult;
                try {
                  // revisit later how to make sure not duplicate
                  signBytesResult = await connectedWallet.signBytes(
                    Buffer.from('LunarAssistant'),
                  );

                  setLoading(true);
                } catch (error: unknown) {
                  setLoading(false);
                  console.error(error);
                  if (error instanceof UserDenied) {
                    alert('User Denied');
                  } else if (error instanceof SignBytesFailed) {
                    alert(`Sign bytes failed: ${error.message}`);
                  } else if (error instanceof Timeout) {
                    alert('Timeout');
                  } else {
                    alert(
                      `Unknown Error: ${
                        error instanceof Error ? error.message : String(error)
                      }`,
                    );
                  }
                }

                if (!signBytesResult) {
                  alert('Could not sign transaction properly');
                  return;
                }

                const publicKeyData =
                  signBytesResult.result.public_key?.toData();

                try {
                  const body: LunarLinkSignRequest = {
                    recid: signBytesResult.result.recid,
                    signature: Buffer.from(
                      signBytesResult.result.signature,
                    ).toString('base64'),
                    publicKey: publicKeyData,
                    jwt: Array.isArray(jwtString)
                      ? jwtString.join()
                      : jwtString || '',
                  };

                  // send the transaction to the backend
                  await LunarApi.post('/api/lunarVerifySign', body);

                  // indicate that the wallet has been linked successfully
                  setLoading(false);
                  setLinkComplete(true);
                  setSnackbarOpen(true);
                } catch (error: any) {
                  setLoading(false);
                  if (error.response) {
                    // Request made and server responded
                    alert(error.response.data.errorMsg);
                  } else if (error.request) {
                    // The request was made but no response was received
                    alert(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    alert(`Error ${error.message}`);
                  }
                }
              } else if (
                connectedWallet &&
                connectedWallet.connectType === 'WALLETCONNECT'
              ) {
                console.log('Posting a transaction');

                let txResult;
                try {
                  txResult = await connectedWallet.post({
                    fee: new Fee(100000, '20000uusd'),
                    msgs: [
                      new MsgSend(
                        connectedWallet.walletAddress,
                        'terra1qxzjv7spze07t4vjwjp3q2cppm0qx5esqvngdx',
                        {
                          uusd: 1,
                        },
                      ),
                    ],
                  });
                } catch (error: unknown) {
                  setLoading(false);
                  console.error(error);
                  if (error instanceof UserDenied) {
                    alert('User Denied');
                  } else if (error instanceof CreateTxFailed) {
                    alert(`Create Tx Failed: ${error.message}`);
                  } else if (error instanceof TxFailed) {
                    alert(`Tx Failed: ${error.message}`);
                  } else if (error instanceof Timeout) {
                    alert('Timeout');
                  } else if (error instanceof TxUnspecifiedError) {
                    alert(`Unspecified Error: ${error.message}`);
                  } else {
                    alert(
                      `Unknown Error: ${
                        error instanceof Error ? error.message : String(error)
                      }`,
                    );
                  }
                }

                console.log(txResult);

                if (!txResult) {
                  alert('Could not post transaction properly');
                  return;
                }
                // setTxResult(nextTxResult);
                const body: LunarLinkPostRequest = {
                  txhash: txResult.result.txhash,
                  jwt: Array.isArray(jwtString)
                    ? jwtString.join()
                    : jwtString || '',
                };

                try {
                  // send the transaction to the backend
                  await LunarApi.post('/api/lunarVerifyPost', body);

                  // indicate that the wallet has been linked successfully
                  setLoading(false);
                  setLinkComplete(true);
                  setSnackbarOpen(true);
                } catch (error: any) {
                  setLoading(false);
                  if (error.response) {
                    // Request made and server responded
                    alert(error.response.data.errorMsg);
                  } else if (error.request) {
                    // The request was made but no response was received
                    alert(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    alert(`Error ${error.message}`);
                  }
                }
              }
            }}
          />
        </Grid>
      </Grid>
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Wallet linked successfully! Run '/lunar-view-roles' in Discord to see
          what roles you have been granted!
        </Alert>
      </Snackbar>
      <ConnectWallet open={open} setOpen={setOpen} />
    </div>
  );
};

export default WelcomeCards;
