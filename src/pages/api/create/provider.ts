import type { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';

import { fql } from '../../../services/fauna';
import { validateCreateProvider } from '../../../utils/validateInputs';

// ! Be careful with double server Response, test and threat all
// ! the conditional operators.

export default async function createProvider(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const isPOSTRequest = req.method === 'POST';

  if (isPOSTRequest) {
    const { name, email, password, phone } = req.body;

    const isValid = await validateCreateProvider(req.body);

    if (!isValid) {
      res.status(400).json({
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
            phone,
            isNewUser: true,
            isProvider: true,
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

    res.status(201).json({ message: 'User was created with success' });
    return;
  }

  // If the request method doesn't "POST" | Master fallback
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method not allowed');
}
