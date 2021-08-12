import type { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';

import { faunaClient } from '../../../services/fauna-js';
import { parseTokenAuth } from '../../../utils/parseTokenAuth';

interface FQLProvidersData {
  data: {
    name: string;
    phone: string;
    isAvailable: true;
  }[];
}

export default async function clientProfile(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const isMethodAllowed = req.method === 'GET';

  if (!isMethodAllowed) {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method not allowed');
    return;
  }

  if (req.method === 'GET') {
    try {
      const { authorization } = req.headers;

      if (typeof authorization !== 'string') {
        res.status(404).end('Not Found');
        return;
      }

      const secret = parseTokenAuth(authorization);

      const { data: providers } = await faunaClient(
        secret
      ).query<FQLProvidersData>(
        q.Map(
          q.Paginate(q.Match(q.Index('available_providers'), true)),
          q.Lambda('ref', q.Select(['data'], q.Get(q.Var('ref'))))
        )
      );

      res.status(200).json(providers);

      // it will block process cascading.
      return;
    } catch (err) {
      res.status(404).json({ error: err.description });
    }
  }
}
