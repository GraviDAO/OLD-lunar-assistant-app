export interface LunarLinkSignRequest {
  recid: any;
  signature: string;
  publicKey: any;
  message: string;
  jwt: string;
}

export interface LunarLinkPostRequest {
  txhash: string;
  jwt: string;
}
