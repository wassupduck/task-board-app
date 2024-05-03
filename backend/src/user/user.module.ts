import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserRepository } from './user.repository.js';
import { AuthModule } from '../auth/auth.module.js';
import { UserResolver } from './user.resolver.js';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserResolver, UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
