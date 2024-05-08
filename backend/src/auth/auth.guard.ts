import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { AuthTokenPayload } from './auth.interfaces.js';
import { GqlExecutionContext } from '@nestjs/graphql';
import { YogaDriverServerContext } from '@graphql-yoga/nestjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator.js';
import { AUTH_TOKEN_COOKIE } from './auth.constants.js';
import { UnauthenticatedError } from './auth.errors.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = this.getRequest(context);
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthenticatedError('User is not authenticated');
    }

    try {
      const payload =
        await this.jwtService.verifyAsync<AuthTokenPayload>(token);
      request['user'] = { id: payload.userId };
    } catch {
      throw new UnauthenticatedError('User is not authenticated');
    }

    return true;
  }

  private getRequest(context: ExecutionContext): FastifyRequest {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<YogaDriverServerContext<'fastify'>>().req;
  }

  private extractTokenFromCookie(request: FastifyRequest): string | undefined {
    return request.cookies[AUTH_TOKEN_COOKIE];
  }
}
