import type { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';

import { fql } from '../_lib/fauna';
import { validateCreateClient } from '../../../utils/validateInputs';

// ! Be careful with double server Response, test and threat all
// ! the conditional operators.

export default async function createClient(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const isPOSTRequest = req.method === 'POST';
  const isJson = req.headers['content-type'] === 'application/json';

  if (isPOSTRequest && isJson) {
    const { name, email, password } = req.body;

    const isValid = await validateCreateClient({ name, email, password });

    if (!isValid) {
      res.status(402).json({
        error: 'Inputs validation failed. Verify if the fields are correct',
      });

      // "return" will block process cascading. This function ends here!
      return;
    }

    const user = await fql.query<{ message: string }>(
      q.If(
        q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(email))),
        // if q.Exists ===  true, will:
        { message: 'already exists' },
        // if q.Exists ===  false, will:
        q.Create(q.Collection('users'), {
          credentials: { password },
          data: {
            name,
            email,
            isNewUser: true,
            isProvider: false,
            createdAt: q.Now(),
            updatedAt: q.Now(),
          },
        })
      )
    );

    if (user?.message === 'already exists') {
      res.status(400).json({ error: 'User already exists!' });
      return;
    }

    res.status(200).json({ message: 'User was created with success' });
    return;
  }

  if (!isJson) {
    res.status(401).json({ error: 'this content type is not allowed' });
    return;
  }

  // If the request method doesn't "POST" | Master fallback
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method not allowed');
}
