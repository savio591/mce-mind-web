import type { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';

import { fql } from '../../services/fauna';
import { validateAuth } from '../../utils/validateInputs';

interface FQLLoginResponse {
  secret: string;
  instance: {
    id: string;
  };
}

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const isPostRequest = req.method === 'POST';

  if (isPostRequest) {
    try {
      const { email, password } = req.body;
      const isRequestValid = validateAuth(req.body);

      if (!isRequestValid) {
        throw new Error();
      }

      const { secret, instance: userRef } = await fql.query<FQLLoginResponse>(
        q.Login(q.Match(q.Index('user_by_email'), q.Casefold(email)), {
          password,
        })
      );

      res.status(200).json({ email, secret, profileId: userRef.id });

      // it will block process cascading.
      return;
    } catch {
      res.status(404).json({ error: 'invalid email/password' });
      return;
    }
  }

  res.setHeader('Allow', 'POST');
  res.status(405).end('Method not allowed');
}
