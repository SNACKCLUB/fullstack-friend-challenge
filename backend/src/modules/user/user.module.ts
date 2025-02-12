import { Module } from '@nestjs/common';
import { FriendshipModule } from '../friendship/friendship.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [FriendshipModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}