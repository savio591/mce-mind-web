import type { NextApiRequest, NextApiResponse } from 'next';
import { Expr, query as q } from 'faunadb';

import { faunaClient } from '../_lib/fauna-js';
import { parseTokenAuth } from '../../../utils/parseTokenAuth';
import { weeksPreset } from '../../../constants/weeksPreset';

interface FQLProvidersData {
  data: {
    name: string;
    email: string;
    phone: string;
    isAvailable: true;
  };
  ref: {
    id: string;
  };
}

interface FQLAppointmentRequest {
  data: {
    id: Expr;
    providerId: string;
    name: string;
    email: string;
    phone: string;
    weeks: [];
    startDate: string;
    pauseStartDate: string;
    pauseEndDate: string;
    endDate: string;
  };
}

export default async function setProviderAvailability(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const isMethodAllowed = req.method === 'POST' || 'GET';

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

      const response = await faunaClient(secret).query<FQLProvidersData>(
        q.Select(
          'data',
          q.Get(
            q.Match(
              q.Index('provider_status_by_provider_ref_id'),
              q.Select('id', q.CurrentIdentity())
            )
          )
        )
      );

      res.status(200).json(response);

      // it will block process cascading.
      return;
    } catch (err) {
      res.status(400).end('Provider not found');
    }
  }

  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;
      const { weeks, isAvailable } = req.body;

      if (typeof authorization !== 'string') {
        res.status(404).end('Not Found');
        return;
      }

      const secret = parseTokenAuth(authorization);

      const {
        data: { name, email, phone },
        ref: { id: providerId },
      } = await faunaClient(secret).query<FQLProvidersData>(
        q.Get(q.CurrentIdentity())
      );

      const response = await faunaClient(secret).query<FQLAppointmentRequest>(
        q.Select(
          'data',
          q.If(
            q.Exists(
              q.Match(
                q.Index('provider_status_by_provider_ref_id'),
                q.Select('id', q.CurrentIdentity())
              )
            ),
            q.Update(
              q.Select(
                'ref',
                q.Get(
                  q.Match(
                    q.Index('provider_status_by_provider_ref_id'),
                    q.Select('id', q.CurrentIdentity())
                  )
                )
              ),
              {
                data: { weeks, isAvailable },
              }
            ),
            q.Create(q.Collection('providers'), {
              data: {
                id: q.NewId(),
                providerId,
                name,
                email,
                phone,
                isAvailable,
                weeks: weeksPreset,
                startDate: '1970-01-01T11:00:00.000Z',
                pauseStartDate: '1970-01-01T13:00:00.000Z',
                pauseEndDate: '1970-01-01T14:00:00.000Z',
                endDate: '1970-01-01T23:00:00.000Z',
              },
            })
          )
        )
      );

      res.status(200).json(response);

      // it will block process cascading.
      return;
    } catch (err) {
      res.status(404).json({ error: 'error on set provider data' });
    }
  }
}
