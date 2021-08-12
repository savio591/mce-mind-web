import type { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';

import { faunaClient } from '../../../services/fauna-js';
import { parseTokenAuth } from '../../../utils/parseTokenAuth';
import { validateUpdateProfile } from '../../../utils/validateInputs';

export default async function clientProfile(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const isMethodAllowed = req.method === 'GET' || 'PUT';
  const { email, name, phone, password } = req.body;

  if (!isMethodAllowed) {
    res.setHeader('Allow', 'GET, POST, PUT');
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

      const { data } = await faunaClient(secret).query<{ data: unknown }>(
        q.Get(q.CurrentIdentity())
      );

      res.status(200).json(data);

      // it will block process cascading.
      return;
    } catch {
      res.status(404).json({ error: 'invalid request' });
      return;
    }
  }

  if (req.method === 'PUT') {
    try {
      const { authorization } = req.headers;
      const isBodyRequestValid = await validateUpdateProfile(req.body);

      if (typeof authorization !== 'string') {
        res.status(404).end('Not Found');
        return;
      }

      if (!isBodyRequestValid) {
        throw new Error('Body is not valid');
      }

      const secret = parseTokenAuth(authorization);

      const { data } = await faunaClient(secret).query<{ data: unknown }>(
        q.Update(q.CurrentIdentity(), {
          data: { email, name, phone },
          credentials: { password },
        })
      );
      res.status(200).json(data);

      // it will block process cascading.
      return;
    } catch (err) {
      res.status(404).json({ error: 'Error on update user data' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { authorization } = req.headers;

      if (typeof authorization !== 'string') {
        res.status(404).end('Not Found');
        return;
      }

      const secret = parseTokenAuth(authorization);

      await faunaClient(secret).query<{ data: unknown }>(
        q.Delete(q.CurrentIdentity())
      );

      res.status(200).json({ message: 'Your account was sucessfully deleted' });

      // it will block process cascading.
      return;
    } catch (err) {
      res.status(404).json({ error: 'invalid request' });
    }
  }
}
