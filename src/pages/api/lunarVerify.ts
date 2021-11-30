import { JWT_SECRET } from '@/constants';
import db from '@/services/firebaseAdmin';
import { LunarVerifyRequest } from '@/shared/requestTypes';
import { verifyBytes } from '@terra-money/wallet-provider';
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
    console.log(req.body);
    const verificationTransaction = req.body as LunarVerifyRequest;

    const verified = verifyBytes(
      Buffer.from('LunarAssistant'),
      verificationTransaction.signBytesResult.result,
    );

    if (!verified) {
      return res.status(400).json({
        result: 'failure',
        errorMsg: 'Could not verify signed transaction as authentic',
      });
    }

    try {
      const { userID } = jwt.verify(
        verificationTransaction.jwt,
        JWT_SECRET,
      ) as jwt.JwtPayload;

      const usersAlreadyRegisteredWithWallet = await db
        .collection('users')
        .where('wallet', '==', verificationTransaction.walletAddress)
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
        wallet: verificationTransaction.walletAddress,
      };

      // Save the wallet to the user
      await db.collection('users').doc(userID).set(user);
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
