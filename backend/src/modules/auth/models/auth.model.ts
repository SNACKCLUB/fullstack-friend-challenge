import { User } from '@/modules/user/models/user.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}