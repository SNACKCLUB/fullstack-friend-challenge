import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { FriendshipStatus } from '../models/friendship.model';

@InputType()
export class UpdateFriendshipInput {
  @Field(() => FriendshipStatus)
  @IsEnum(FriendshipStatus)
  status: FriendshipStatus;
}