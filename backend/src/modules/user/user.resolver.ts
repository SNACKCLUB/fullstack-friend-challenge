import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { GqlAuthGuard } from '@/modules/auth/guards/gql-auth.guard';
import { FriendshipService } from '@/modules/friendship/friendship.service';
import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { SearchUsersInput } from './dto/search-users.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UserService } from './user.service';


@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly friendshipService: FriendshipService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async user(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async searchUsers(
    @Args('input') { query }: SearchUsersInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.userService.searchUsers(query, currentUser.id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    if (id !== currentUser.id) {
      throw new Error('You can only update your own profile');
    }
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async removeUser(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() currentUser: User,
  ) {
    if (id !== currentUser.id) {
      throw new Error('You can only remove your own profile');
    }
    return this.userService.remove(id);
  }

  @ResolveField(() => [User])
  async friends(@Parent() user: User) {
    return this.friendshipService.findUserFriends(user.id);
  }
}