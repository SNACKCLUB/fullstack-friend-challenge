import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(8)
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;
}