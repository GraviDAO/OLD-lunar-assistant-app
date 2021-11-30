import { SignBytesResult } from '@terra-money/use-wallet';

export interface LunarVerifyRequest {
  signBytesResult: SignBytesResult;
  walletAddress: string;
  jwt: string;
}
