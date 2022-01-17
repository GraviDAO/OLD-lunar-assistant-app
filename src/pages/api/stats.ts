import db from '@/services/firebaseAdmin';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  numUsers: number;
  numServers: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const statsRef = db.collection('root').doc('stats');

    const stats = (await statsRef.get()).data() as Data;

    res.send(stats);
  }
}
