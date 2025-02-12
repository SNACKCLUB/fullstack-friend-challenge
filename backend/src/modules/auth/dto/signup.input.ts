import { Field, InputType } from '@nestjs/graphql';
import { LoginInput } from './login.input';

@InputType()
export class SignUpInput extends LoginInput {
  @Field()
  name: string;
}
