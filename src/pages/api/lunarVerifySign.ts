import { JWT_SECRET } from '@/constants';
import db from '@/services/firebaseAdmin';
import { LunarLinkSignRequest } from '@/shared/requestTypes';
import { SignBytesResult } from '@terra-dev/wallet-types';
import { PublicKey } from '@terra-money/terra.js';
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
    const lunarVerifyRequest = req.body as LunarLinkSignRequest;

    const publicKey = PublicKey.fromData(lunarVerifyRequest.publicKey);
    const signature = Buffer.from(lunarVerifyRequest.signature, 'base64');

    // const msgData = Buffer.from(
    //   SHA256.hash(sign.stdSignMsgData.toString()).toString(),
    //   'hex',
    // );

    const signBytesResult: SignBytesResult['result'] = {
      public_key: publicKey,
      signature,
      recid: lunarVerifyRequest.recid,
    };

    const walletAddress = publicKey.address();

    // const verified = verifyBytes(
    //   Buffer.from('LunarAssistant'),
    //   signBytesResult,
    // );
    const verified = true;

    if (!verified) {
      return res.status(400).json({
        result: 'failure',
        errorMsg: 'Could not verify signed transaction as authentic',
      });
    }

    let userID;

    try {
      const jwtPayload = jwt.verify(
        lunarVerifyRequest.jwt,
        JWT_SECRET,
      ) as jwt.JwtPayload;

      userID = jwtPayload.userID;
    } catch {
      return res.status(400).json({
        result: 'failure',
        errorMsg:
          'Could not verify the JWT. This normally happens when an hour passes between running /lunar-link and signing the transaction. Please run /lunar-link and try again.',
      });
    }

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

    return res.status(200).json({ result: 'success' });
  }
  return res.status(404);
}
