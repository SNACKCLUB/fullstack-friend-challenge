import { BaseModel } from '@/common/models/base.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum NotificationType {
  FRIEND_REQUEST = 'FRIEND_REQUEST',
  FRIEND_REQUEST_ACCEPTED = 'FRIEND_REQUEST_ACCEPTED',
  FRIEND_REQUEST_REJECTED = 'FRIEND_REQUEST_REJECTED'
}

registerEnumType(NotificationType, {
  name: 'NotificationType',
});

@ObjectType()
export class Notification extends BaseModel {
  @Field(() => NotificationType)
  type: NotificationType;

  @Field()
  message: string;

  @Field()
  userId: string;

  @Field()
  read: boolean;

  @Field(() => String, { nullable: true })
  data?: string;
}