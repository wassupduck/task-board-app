import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from '../auth.interfaces.js';
import { GqlExecutionContext } from '@nestjs/graphql';
import { YogaDriverServerContext } from '@graphql-yoga/nestjs';

export const CurrentUser = createParamDecorator(
  (data: keyof RequestUser | undefined, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext<YogaDriverServerContext<'fastify'>>().req.user;
    return data ? user?.[data] : user;
  },
);
