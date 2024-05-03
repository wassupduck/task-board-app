import { YogaDriverServerContext } from '@graphql-yoga/nestjs';
import { Loaders } from '../loader/index.js';

export interface GraphQLContext extends YogaDriverServerContext<'fastify'> {
  loaders: Loaders;
}
