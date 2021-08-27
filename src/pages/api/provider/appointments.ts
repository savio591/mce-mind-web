import type { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';

import { faunaClient } from '../../../services/fauna-js';
import { parseTokenAuth } from '../../../utils/parseTokenAuth';

interface FQLProviderData {
  data: {
    name: string;
    phone: string;
    isAvailable: true;
  };
  ref: {
    id: string;
  };
}

export default async function myClientAppointments(
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
      const { date, all } = req.query;

      if (typeof authorization !== 'string') {
        res.status(400).end('Token not Found');
        return;
      }

      const secret = parseTokenAuth(authorization);

      const providers = await faunaClient(secret).query<FQLProviderData>(
        date || all === 'true'
          ? q.Map(
              q.Paginate(
                q.Match(
                  q.Index('appointments_by_provider_ref_id_and_date'),
                  q.Casefold(date.slice(0, 10)),
                  q.Select('id', q.CurrentIdentity())
                )
              ),
              q.Lambda('ref', q.Select('data', q.Get(q.Var('ref'))))
            )
          : q.Map(
              q.Paginate(
                q.Match(
                  q.Index('appointments_by_provider_ref_id'),
                  q.Select('id', q.CurrentIdentity())
                )
              ),
              q.Lambda('ref', q.Select('data', q.Get(q.Var('ref'))))
            )
      );

      const calendarData = await faunaClient(secret).query(
        q.Select(
          'data',
          q.Paginate(
            q.Distinct(
              q.Match(
                q.Index('appointments_dates_by_provider_ref_id'),
                q.Select('id', q.CurrentIdentity())
              )
            )
          )
        )
      );

      res.status(200).json({ appointmentsData: providers.data, calendarData });

      // it will block process cascading.
      return;
    } catch (err) {
      res.status(404).json({ error: err.description });
    }
  }
}
