import { Injectable } from '@nestjs/common';
import { DatabaseClient, DatabaseError } from '../database/index.js';
import { User } from './entities/user.entity.js';
import {
  insertUser,
  selectUserById,
  selectUserByUsername,
} from './user.queries.js';
import { UniqueViolationError } from 'db-errors';
import { UserUsernameConflictError } from './user.errors.js';

type NewUser = Pick<User, 'username' | 'passwordHash'>;

@Injectable()
export class UserRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getUserById(id: string): Promise<User | null> {
    return await this.db.queryOneOrNone(selectUserById, { id });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await this.db.queryOneOrNone(selectUserByUsername, { username });
  }

  async createUser(user: NewUser): Promise<User> {
    try {
      return await this.db.queryOne(insertUser, { user });
    } catch (error) {
      if (
        error instanceof DatabaseError &&
        error.cause instanceof UniqueViolationError &&
        error.cause.constraint === 'app_user_username_unique_idx'
      ) {
        throw new UserUsernameConflictError(user.username);
      }
      throw error;
    }
  }
}
