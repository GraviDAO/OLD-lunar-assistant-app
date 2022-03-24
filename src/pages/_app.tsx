import { defaultNetwork, walletConnectChainIds } from '@/constants';
import { createTheme, ThemeProvider } from '@material-ui/core';
import {
  StaticWalletProvider,
  WalletProvider,
} from '@terra-money/wallet-provider';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import '../static/landingPage.css';
import '../styles/index.scss';
import '../static/global.css';

const theme = createTheme({
  palette: {
    primary: { main: '#0ff' },
  },
  shape: {
    borderRadius: 20,
  },
  overrides: {
    MuiDialog: {
      paper: {
        background: 'transparent',
        borderRadius: 0,
      },
    },
    MuiDialogTitle: {
      root: {
        padding: '5px 0',
      },
    },
    MuiDialogContent: {
      root: {
        border: '3px solid #0ff',
        background: '#231F20',
        padding: '30px',
      },
    },
    MuiButton: {
      containedPrimary: {
        padding: '10px 25px',
        '&:hover': {
          backgroundColor: '#ffff54',
          transitionProperty: 'transform',
          transitionDuration: '0.3s',
          transform: 'scale(1.1)',
          transitionTimingFunction: 'ease',
        },
      },
      contained: {
        backgroundColor: '#0ff',
        borderRadius: 0,
        border: 'none',
        color: '#050505',
        fontSize: '14px',
        letterSpacing: 1,
        fontFamily: 'Jura, serif',
        fontWeight: 600,
        textAlign: 'center',
        textTransform: 'uppercase',
      },
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const main = (
    <>
      <Head>
        <title>Lunar Assistant</title>
        <meta
          name="description"
          content="Lunar Assistant makes managing your terra communities easy!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );

  return typeof window !== 'undefined' ? (
    <WalletProvider
      defaultNetwork={defaultNetwork}
      walletConnectChainIds={walletConnectChainIds}
    >
      {main}
    </WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={defaultNetwork}>
      {main}
    </StaticWalletProvider>
  );
}
