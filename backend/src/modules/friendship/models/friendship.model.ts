import { BaseModel } from '@/common/models/base.model';
import { User } from '@/modules/user/models/user.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum FriendshipStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

registerEnumType(FriendshipStatus, {
  name: 'FriendshipStatus',
});

@ObjectType()
export class Friendship extends BaseModel {
  @Field(() => FriendshipStatus)
  status: FriendshipStatus;

  @Field(() => User)
  sender: User;

  @Field(() => String)
  senderId: string;

  @Field(() => User)
  receiver: User;

  @Field(() => String)
  receiverId: string;
}
