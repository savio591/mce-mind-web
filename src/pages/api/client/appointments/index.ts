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
  const isMethodAllowed = req.method === 'GET' || 'POST';

  if (!isMethodAllowed) {
    res.setHeader('Allow', 'GET, POST');
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

      const { data: appointment } = await faunaClient(
        secret
      ).query<FQLProvidersData>(
        q.Map(
          q.Paginate(
            q.Match(
              q.Index('appointments_by_client_ref_id'),
              q.Select('id', q.CurrentIdentity())
            )
          ),
          q.Lambda('clientRef', q.Select('data', q.Get(q.Var('clientRef'))))
        )
      );

      res.status(200).json(appointment);

      // it will block process cascading.
      return;
    } catch (err) {
      res.status(404).json(err);
    }
  }

  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;
      const { startDate, endDate, providerId } = req.body;

      if (typeof authorization !== 'string') {
        res.status(404).end('Not Found');
        return;
      }

      const secret = parseTokenAuth(authorization);

      const provider = await faunaClient(secret).query<{
        name: string;
        phone: string;
        email: string;
      }>(
        q.Select(
          'data',
          q.Get(
            q.Match(q.Index('provider_status_by_provider_ref_id'), providerId)
          )
        )
      );

      const {
        data: { name, email, phone },
        ref: { id: clientId },
      } = await faunaClient(secret).query<FQLProvidersData>(
        q.Get(q.CurrentIdentity())
      );

      const createAppointment = await faunaClient(secret).query<{
        data: { name: string };
      }>(
        q.Create(q.Collection('appointments'), {
          data: {
            id: q.NewId(),
            providerId,
            clientId,
            startDate,
            endDate,
            clientName: provider.name,
            clientPhone: provider.phone,
            clientEmail: provider.email,
            name,
            email,
            phone,
          },
        })
      );

      // it will sends a notification to the provider
      await faunaClient(secret).query(
        q.Create(q.Collection('notifications'), {
          data: {
            id: q.NewId(),
            providerId,
            clientId,
            clientName: name,
            startDate,
            endDate,
            isViewed: false,
          },
        })
      );

      res.status(200).json(createAppointment.data);

      // it will block process cascading.
      return;
    } catch {
      res.status(404).json({ error: 'Error on fetch data' });
    }
  }
}
