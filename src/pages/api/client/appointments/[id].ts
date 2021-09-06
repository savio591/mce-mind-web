import type { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';

import { faunaClient } from '../../_lib/fauna-js';
import { parseTokenAuth } from '../../../../utils/parseTokenAuth';

interface FQLProvidersData {
  data: {
    name: string;
    email: string;
    phone: string;
    isAvailable: true;
    providerId: string;
    clientId: string;
  };
  ref: {
    id: string;
  };
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
      const { id } = req.query;

      if (typeof authorization !== 'string') {
        res.status(404).end('Not Found');
        return;
      }

      const secret = parseTokenAuth(authorization);

      const { data: appointment } = await faunaClient(
        secret
      ).query<FQLProvidersData>(
        q.Get(q.Match(q.Index('appointments_by_id'), q.Casefold(id)))
      );

      res.status(200).json(appointment);

      // it will block process cascading.
      return;
    } catch (err) {
      res.status(404).json(err);
    }
  }
}
