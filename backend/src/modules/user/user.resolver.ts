import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
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
  async removeUser(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() currentUser: User,
  ) {
    if (id !== currentUser.id) {
      throw new Error('You can only remove your own profile');
    }
    return this.userService.remove(id);
  }
}