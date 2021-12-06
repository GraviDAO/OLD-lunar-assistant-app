export interface LunarLinkSignRequest {
  recid: any;
  signature: string;
  publicKey: any;
  jwt: string;
}

export interface LunarLinkPostRequest {
  txhash: string;
  jwt: string;
}
