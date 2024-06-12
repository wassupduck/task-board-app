import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenPayload } from './auth.interfaces.js';
import { FastifyReply } from 'fastify';
import { AUTH_TOKEN_COOKIE } from './auth.constants.js';
import { PasswordService } from './password.service.js';
import { UserService } from '../user/user.service.js';
import { User } from '../user/entities/user.entity.js';
import { LoginCredentialsInput } from './dto/login-credentials.input.js';
import { CookieSerializeOptions } from '@fastify/cookie';
import config from '../config.js';

const AUTH_TOKEN_COOKIE_OPTIONS: CookieSerializeOptions = {
  path: '/graphql',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  domain: config.domainName,
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) {}

  async authenticateUser({
    username,
    password,
  }: LoginCredentialsInput): Promise<User | null> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      return null;
    }
    const authorized = await this.passwordService.verifyPassword(
      user.passwordHash,
      password,
    );
    if (!authorized) {
      return null;
    }
    return user;
  }

  async logInUser(user: User, response: FastifyReply): Promise<void> {
    const token = await this.createJwtToken(user);
    response.setCookie(AUTH_TOKEN_COOKIE, token, AUTH_TOKEN_COOKIE_OPTIONS);
  }

  logoutUser(response: FastifyReply): void {
    response.clearCookie(AUTH_TOKEN_COOKIE, AUTH_TOKEN_COOKIE_OPTIONS);
  }

  private async createJwtToken(user: User): Promise<string> {
    const payload: AuthTokenPayload = { userId: user.id };
    return await this.jwtService.signAsync(payload);
  }
}
