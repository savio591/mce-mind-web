import { Client as FaunaServer } from 'faunadb';

// FQL = Fauna Query Language
export const fql = new FaunaServer({
  secret: process.env.FAUNA_SERVER_KEY ?? '',
});
