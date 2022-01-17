import db from '@/services/firebaseAdmin';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  userCount: number;
  serverCount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const statsRef = db.collection('root').doc('stats');

    const stats = (await statsRef.get()).data() as { userCount: number };

    const guildConfigSnapshot = await db.collection('guildConfigs').get();

    res.send({
      ...stats,
      serverCount: guildConfigSnapshot.docs.length,
    });
  }
}
