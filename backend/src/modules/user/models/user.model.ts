import { BaseModel } from '@/common/models/base.model';
import { Notification } from '@/modules/notifications/models/notification.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { FriendRequest } from './friend-request.model';

@ObjectType()
export class User extends BaseModel {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => [Notification], { nullable: true })
  notifications?: Notification[];

  @Field(() => [User], { nullable: true })
  friends?: User[];

  @Field(() => [FriendRequest], { nullable: true })
  receivedFriendRequests?: FriendRequest[];

  @Field(() => [FriendRequest], { nullable: true })
  sentFriendRequests?: FriendRequest[];
}