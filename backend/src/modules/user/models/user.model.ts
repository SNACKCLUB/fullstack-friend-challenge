import { BaseModel } from '@/common/models/base.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends BaseModel {
  @Field()
  email: string;

  @Field()
  name: string;
}