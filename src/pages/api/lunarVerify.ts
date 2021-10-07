// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import Cors from 'cors';
import { JWT_SECRET } from '@/constants';
import db from '@/services/firebaseAdmin';
import { SHA256 } from 'jscrypto/SHA256';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as secp256k1 from 'secp256k1';

interface User {
  wallets: string[];
}

type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    console.log(req.body);
    const verificationTransaction = req.body;

    // get the signature buffer
    const sigBuffer = Buffer.from(verificationTransaction.signature, 'base64');

    // get the hash buffer
    const hashBuffer = Buffer.from(
      SHA256.hash(verificationTransaction.stdSignMsgData.toString()).toString(),
      'hex',
    );

    // get the public key buffer
    const pubBuffer = Buffer.from(verificationTransaction.public_key, 'base64');

    // verify the transaction is legit
    const verified = secp256k1.ecdsaVerify(
      Uint8Array.from(sigBuffer),
      Uint8Array.from(hashBuffer),
      Uint8Array.from(pubBuffer),
    );

    if (!verified) {
      return res.status(400).json({ result: 'failure' });
    }

    try {
      const { userID } = jwt.verify(
        verificationTransaction.jwt,
        JWT_SECRET,
      ) as jwt.JwtPayload;

      const userDoc = await db.collection('users').doc(userID).get();

      let user: User;
      if (userDoc.exists) {
        user = userDoc.data() as User;

        if (!user.wallets.includes(verificationTransaction.wallet_address)) {
          user.wallets.push(verificationTransaction.wallet_address);
        }
      } else {
        user = {
          wallets: [verificationTransaction.wallet_address],
        };
      }

      await db.collection('users').doc(userID).set(user);
    } catch {
      return res.status(400).json({ result: 'failure' });
    }

    return res.status(200).json({ result: 'success' });
  }
  return res.status(404);
}
