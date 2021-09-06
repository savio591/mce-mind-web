import type { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';

import { faunaClient } from './_lib/fauna-js';
import { parseTokenAuth } from '../../utils/parseTokenAuth';

export default async function clientProfile(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const isMethodAllowed = req.method === 'GET';

  if (!isMethodAllowed) {
    res.setHeader('Allow', 'GET, POST, PUT');
    res.status(405).end('Method not allowed');
    return;
  }

  try {
    const { authorization } = req.headers;
    if (typeof authorization !== 'string') {
      res.status(404).end('Not Found');
      return;
    }

    const secret = parseTokenAuth(authorization);

    const { data } = await faunaClient(secret).query<{ data: unknown }>(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index('notifications_by_provider_id'),
            q.Select('id', q.CurrentIdentity())
          )
        ),
        q.Lambda('ref', q.Select('data', q.Get(q.Var('ref'))))
      )
    );

    res.status(200).json(data);

    // it will block process cascading.
    return;
  } catch {
    res.status(401).json({ error: 'invalid request' });
  }
}
