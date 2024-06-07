import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service.js';
import { User } from './entities/user.entity.js';
import { SignupResponse } from './dto/signup-response.dto.js';
import { SignupInput } from './dto/signup.input.js';
import { UserUsernameConflictError } from './user.errors.js';
import { UserUsernameConflictErrorResponse } from './dto/user-username-conflict-error.dto.js';
import { responseFromCommonError } from '../common/errors/response-from-common-error.js';
import { SignupSuccess } from './dto/signup-success.dto.js';
import { GraphQLContext } from '../common/graphql-context.js';
import { AuthService } from '../auth/auth.service.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Public } from '../auth/decorators/public.decorator.js';
import { UnauthenticatedError } from '../auth/auth.errors.js';
import { SignupService } from './signup.service.js';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly signupService: SignupService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => User)
  async viewer(@CurrentUser('id') userId: string): Promise<User> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new UnauthenticatedError('User is not authenticated');
    }
    return user;
  }

  @Public()
  @Mutation(() => SignupResponse)
  async signup(
    @Args('input') input: SignupInput,
    @Context() ctx: GraphQLContext,
  ): Promise<typeof SignupResponse> {
    let user: User;
    try {
      user = await this.signupService.signup(input.user);
    } catch (error) {
      if (error instanceof UserUsernameConflictError) {
        return new UserUsernameConflictErrorResponse(error.message);
      }
      const commonErrorResponse = responseFromCommonError(error);
      if (commonErrorResponse) return commonErrorResponse;
      throw error;
    }

    await this.authService.logInUser(user, ctx.reply);

    return new SignupSuccess(user);
  }
}
