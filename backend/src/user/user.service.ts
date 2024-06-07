import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity.js';
import { UserRepository } from './user.repository.js';
import { PasswordService } from '../auth/password.service.js';
import { newUserInputSchema } from './schemas/new-user-input.schema.js';
import { ValidationError } from '../common/errors/validation-error.js';
import { NewUserInput } from './dto/new-user.input.js';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.getUserById(id);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.getUserByUsername(username);
  }

  async createUser(newUserInput: NewUserInput): Promise<User> {
    const validationResult =
      await newUserInputSchema.safeParseAsync(newUserInput);
    if (!validationResult.success) {
      // TODO: Better validation errors
      const issue = validationResult.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    const newUser = validationResult.data;

    const passwordHash = await this.passwordService.hashPassword(
      newUser.password,
    );
    return await this.userRepository.createUser({
      ...newUser,
      passwordHash,
    });
  }
}
