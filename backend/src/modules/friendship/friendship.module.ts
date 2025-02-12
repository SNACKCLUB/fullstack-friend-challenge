import { CacheModule } from '@/cache/cache.module';
import { Module } from '@nestjs/common';
import { NotificationsModule } from '../notifications/notifications.module';
import { FriendshipResolver } from './friendship.resolver';
import { FriendshipService } from './friendship.service';

@Module({
  imports: [NotificationsModule, CacheModule],
  providers: [FriendshipResolver, FriendshipService],
  exports: [FriendshipService],
})
export class FriendshipModule {}