import { Client } from 'faunadb';

// FQL = Fauna Query Language
export const faunaClient = (secret: string): Client => {
  return new Client({
    secret,
  });
};
