/* eslint-disable @typescript-eslint/no-unused-vars */
import { query as q } from 'faunadb';
import NextAuth, { User } from 'next-auth';
import Providers from 'next-auth/providers';
import { api } from '../../../services/api';
import { fql } from '../../../services/fauna';

interface CredentialsProps {
  email: string;
  password: string;
}

// interface SessionUserData extends Session {
//   user: {
//     name: string;
//     email: string;
//     image: string;
//     isProvider: boolean;
//   };
// }

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user',
    }),
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials: CredentialsProps): Promise<User | null> {
        try {
          const { email, password } = credentials;

          const auth = await api.post<{ secret: string }>('signin', {
            email,
            password,
          });

          const { secret } = auth.data;

          return { name: secret };
        } catch (err) {
          return null;
        }
      },
    }),
  ],

  debug: true,
  callbacks: {
    async signIn(user, account, profile) {
      try {
        if (account.provider === 'github') {
          await fql.query(
            q.If(
              q.Not(
                q.Exists(
                  q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(user.email ?? '')
                  )
                )
              ),
              q.Create(q.Collection('users'), {
                data: {
                  name: user.name,
                  email: user.email,
                  image: user.image,
                  isProvider: true,
                  newUser: true,
                  isOauth: true,
                },
                credentials: {
                  password: account.id.toString(),
                },
              }),
              q.Get(
                q.Match(q.Index('user_by_email'), q.Casefold(user.email ?? ''))
              )
            )
          );
          await fql.query(
            q.If(
              q.Exists(
                q.Match(q.Index('is_oauth_by_email'), [
                  q.Casefold(user.email ?? ''),
                  true,
                ])
              ),
              true,
              q.Abort('Email already exists!')
            )
          );
        }
        return true;
      } catch (err) {
        return false;
      }
    },
    async session(session, user) {
      const { data: profileResponse } = await api.get<User>('profile', {
        headers: { Authorization: `Bearer ${user.name}` },
      });
      return { ...session, user: { ...profileResponse }, secret: user.name };
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token;
    },
  },
});
