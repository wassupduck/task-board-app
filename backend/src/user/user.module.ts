import { forwardRef, Module } from '@nestjs/common';
import { BoardModule } from '../board/index.js';
import { TaskModule } from '../task/index.js';
import { UserService } from './user.service.js';
import { UserRepository } from './user.repository.js';
import { AuthModule } from '../auth/auth.module.js';
import { UserResolver } from './user.resolver.js';
import { SignupService } from './signup.service.js';

@Module({
  imports: [forwardRef(() => AuthModule), BoardModule, TaskModule],
  providers: [UserResolver, UserService, SignupService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
