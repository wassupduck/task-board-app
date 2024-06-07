import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLContext } from 'src/common/graphql-context.js';
import { LoginResponse } from './dto/login-response.dto.js';
import { LoginInput } from './dto/login.input.js';
import { LoginSuccess } from './dto/login-success.dto.js';
import { UnauthorizedErrorResponse } from './dto/unauthorized-error.dto.js';
import { LogoutResponse } from './dto/logout-response.dto.js';
import { AuthService } from './auth.service.js';
import { Public } from './decorators/public.decorator.js';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => LoginResponse)
  async login(
    @Args('input') input: LoginInput,
    @Context() ctx: GraphQLContext,
  ): Promise<typeof LoginResponse> {
    const user = await this.authService.authenticateUser(input.credentials);
    if (!user) {
      return new UnauthorizedErrorResponse('Unauthorized');
    }

    await this.authService.logInUser(user, ctx.reply);

    return new LoginSuccess(user);
  }

  @Public()
  @Mutation(() => LogoutResponse)
  logout(@Context() ctx: GraphQLContext): LogoutResponse {
    this.authService.logoutUser(ctx.reply);
    return new LogoutResponse();
  }
}
