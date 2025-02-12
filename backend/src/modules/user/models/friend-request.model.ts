import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class FriendRequest {
  @Field()
  id: string;

  @Field(() => User)
  sender: User;

  @Field(() => User)
  receiver: User;

  @Field()
  status: string; // 'pending' | 'accepted' | 'rejected'

  @Field()
  createdAt: Date;
}
