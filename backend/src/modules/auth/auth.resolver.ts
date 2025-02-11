// src/modules/auth/auth.resolver.ts
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@/modules/user/models/user.model';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { Auth } from './models/auth.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    return user;
  }
}