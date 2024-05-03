import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { PasswordService } from './password.service.js';
import { JwtModule } from '@nestjs/jwt';
import config from '../config.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard.js';
import { UserModule } from '../user/user.module.js';
import { AuthResolver } from './auth.resolver.js';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.jwtOptions.secret,
      signOptions: {
        expiresIn: config.jwtOptions.expiresIn,
      },
    }),
    forwardRef(() => UserModule),
  ],
  providers: [
    AuthService,
    PasswordService,
    AuthResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService, PasswordService],
})
export class AuthModule {}
