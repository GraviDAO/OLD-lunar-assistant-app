import { defaultNetwork, walletConnectChainIds } from '@/constants';
import '@/styles/global.css';
import { createTheme, ThemeProvider } from '@material-ui/core';
import {
  StaticWalletProvider,
  WalletProvider,
} from '@terra-money/wallet-provider';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

const theme = createTheme({
  shape: {
    borderRadius: 20,
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
