import { JWT_SECRET } from '@/constants';
import db from '@/services/firebaseAdmin';
import { LunarLinkPostRequest } from '@/shared/requestTypes';
import { LCDClient, TxInfo } from '@terra-money/terra.js';
import firebase from 'firebase-admin';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  result: string;
  errorMsg?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    const terra = new LCDClient({
      URL: 'https://lcd.terra.dev',
      chainID: 'columbus-5',
    });
    const lunarVerifyRequest = req.body as LunarLinkPostRequest;

    let tx: TxInfo;

    try {
      tx = await terra.tx.txInfo(lunarVerifyRequest.txhash);
    } catch {
      return res.status(400).json({
        result: 'failure',
        errorMsg: 'Could not find transaction.',
      });
    }

    if (
      (Math.floor(Date.now() / 1000) -
        Math.floor(Date.parse(tx.timestamp) / 1000)) /
        60 >
      1
    ) {
      return res.status(400).json({
        result: 'failure',
        errorMsg: 'Transaction took place too long ago. Please try again.',
      });
    }

    const walletAddress = tx.tx.auth_info.signer_infos[0].public_key.address();
    console.log(tx.tx);
    console.log(walletAddress);

    try {
      const { userID } = jwt.verify(
        lunarVerifyRequest.jwt,
        JWT_SECRET,
      ) as jwt.JwtPayload;

      const usersAlreadyRegisteredWithWallet = await db
        .collection('users')
        .where('wallet', '==', walletAddress)
        .get();

      if (
        !usersAlreadyRegisteredWithWallet.empty &&
        usersAlreadyRegisteredWithWallet.docs[0].id !== userID
      ) {
        // There already exists another user with this wallet address
        return res.status(400).json({
          result: 'failure',
          errorMsg:
            'Another discord user has already registered this wallet address. If you think this is an error, please reach out to GraviDAO.',
        });
      }

      const user: User = {
        wallet: walletAddress,
      };

      const statsRef = db.collection('root').doc('stats');
      const batch = db.batch();
      const increment = firebase.firestore.FieldValue.increment(1);

      batch.set(db.collection('users').doc(userID), user);

      if (usersAlreadyRegisteredWithWallet.empty) {
        // user not registered so increment
        batch.set(statsRef, { userCount: increment }, { merge: true });
      }

      // Save the changes to the db
      await batch.commit();
    } catch {
      return res.status(400).json({
        result: 'failure',
        errorMsg:
          'Could not verify the JWT. This normally happens when an hour passes between running /lunar-link and signing the transaction. Please run /lunar-link and try again.',
      });
    }

    return res.status(200).json({ result: 'success' });
  }
  return res.status(404);
}
