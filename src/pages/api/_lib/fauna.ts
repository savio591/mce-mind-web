import { Client as FaunaServer } from 'faunadb';

// FQL = Fauna Query Language
export const fql = new FaunaServer({
  secret: 'fnAEQBjyxhACQjQYfhV0yGZqtN-42BQ7cXL-DAXn',
});
