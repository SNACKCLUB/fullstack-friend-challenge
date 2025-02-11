import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { GqlAuthGuard } from '@/modules/auth/guards/gql-auth.guard';
import { User } from '@/modules/user/models/user.model';
import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFriendshipInput } from './dto/create-friendship.input';
import { UpdateFriendshipInput } from './dto/update-friendship.input';
import { FriendshipService } from './friendship.service';
import { Friendship } from './models/friendship.model';

@Resolver(() => Friendship)
@UseGuards(GqlAuthGuard)
export class FriendshipResolver {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Mutation(() => Friendship)
  async sendFriendRequest(
    @CurrentUser() user: User,
    @Args('createFriendshipInput') createFriendshipInput: CreateFriendshipInput,
  ) {
    return this.friendshipService.create(user.id, createFriendshipInput);
  }

  @Query(() => [Friendship])
  async myFriendships(@CurrentUser() user: User) {
    return this.friendshipService.findUserFriendships(user.id);
  }

  @Query(() => [User])
  async myFriends(@CurrentUser() user: User) {
    return this.friendshipService.findUserFriends(user.id);
  }

  @Query(() => [Friendship])
  async pendingFriendRequests(@CurrentUser() user: User) {
    return this.friendshipService.findPendingRequests(user.id);
  }

  @Mutation(() => Friendship)
  async respondToFriendRequest(
    @CurrentUser() user: User,
    @Args('id') id: string,
    @Args('updateFriendshipInput') updateFriendshipInput: UpdateFriendshipInput,
  ) {
    return this.friendshipService.update(id, user.id, updateFriendshipInput);
  }

  @Mutation(() => Boolean)
  async removeFriend(
    @CurrentUser() user: User,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.friendshipService.remove(id, user.id);
  }
}