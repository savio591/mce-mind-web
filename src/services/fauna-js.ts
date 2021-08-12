import { Client } from 'faunadb';

// FQL = Fauna Query Language
export const faunaClient = (secret: string): Client => {
  console.log(secret);
  return new Client({
    secret,
  });
};
