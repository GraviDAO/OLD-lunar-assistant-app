export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;

export const defaultNetwork = {
  name: `mainnet`,
  chainID: `columbus-5`,
  lcd: `https://lcd.terra.dev`,
  walletconnectID: 1,
};
export const walletConnectChainIds = {
  '0': {
    name: `testnet`,
    chainID: `bombay-12`,
    lcd: `https://bombay-lcd.terra.dev`,
    walletconnectID: 0,
  },
  '1': {
    name: `mainnet`,
    chainID: `columbus-5`,
    lcd: `https://lcd.terra.dev`,
    walletconnectID: 1,
  },
};
