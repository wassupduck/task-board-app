import { CookieSerializeOptions } from '@fastify/cookie';

export const AUTH_TOKEN_COOKIE = 'auth_token';
export const AUTH_TOKEN_COOKIE_OPTIONS: CookieSerializeOptions = {
  path: '/graphql',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
};
