import { RequestUser } from '../auth/index.js';

declare module 'fastify' {
  export interface FastifyRequest {
    user?: RequestUser;
  }
}
