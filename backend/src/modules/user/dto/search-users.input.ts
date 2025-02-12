import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchUsersInput {
  @Field()
  query: string;
}
