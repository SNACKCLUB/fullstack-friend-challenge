import { PrismaService } from '@/prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CacheManagerStore } from 'cache-manager';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateFriendshipInput } from './dto/create-friendship.input';
import { UpdateFriendshipInput } from './dto/update-friendship.input';
import { FriendshipStatus } from './models/friendship.model';

@Injectable()
export class FriendshipService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: CacheManagerStore,
    private notificationsService: NotificationsService
  ) {}

  private getCacheKey(userId: string) {
    return `user_friends:${userId}`;
  }

  async create(senderId: string, createFriendshipInput: CreateFriendshipInput) {
    const existingFriendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          {
            senderId,
            receiverId: createFriendshipInput.receiverId,
          },
          {
            senderId: createFriendshipInput.receiverId,
            receiverId: senderId,
          },
        ],
      },
    });

    if (existingFriendship) {
      throw new ConflictException('Friendship request already exists');
    }

    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
    });

    const receiver = await this.prisma.user.findUnique({
      where: { id: createFriendshipInput.receiverId },
    });

    if (!receiver) {
      throw new NotFoundException('Receiver not found');
    }

    const friendship = await this.prisma.friendship.create({
      data: {
        senderId,
        receiverId: createFriendshipInput.receiverId,
        status: FriendshipStatus.PENDING,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    await this.cacheManager.del(this.getCacheKey(senderId));
    await this.cacheManager.del(this.getCacheKey(createFriendshipInput.receiverId));

    await this.notificationsService.notifyFriendRequest(createFriendshipInput.receiverId, sender);


    return friendship;
  }

  async findUserFriendships(userId: string) {
    const cacheKey = this.getCacheKey(userId);
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    const friendships = await this.prisma.friendship.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    await this.cacheManager.set(cacheKey, friendships);

    return friendships;
  }

  async findUserFriends(userId: string) {
    const friendships = await this.prisma.friendship.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
        status: FriendshipStatus.ACCEPTED,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    return friendships.map(friendship => 
      friendship.senderId === userId ? friendship.receiver : friendship.sender
    );
  }

  async findPendingRequests(userId: string) {
    return this.prisma.friendship.findMany({
      where: {
        receiverId: userId,
        status: FriendshipStatus.PENDING,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
  }

  async update(
    id: string, 
    userId: string,
    updateFriendshipInput: UpdateFriendshipInput,
  ) {
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        id,
        receiverId: userId,
        status: FriendshipStatus.PENDING,
      },
    });

    if (!friendship) {
      throw new NotFoundException('Friendship request not found');
    }

    const updatedFriendship = await this.prisma.friendship.update({
      where: { id },
      data: {
        status: updateFriendshipInput.status,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    await this.cacheManager.del(this.getCacheKey(friendship.senderId));
    await this.cacheManager.del(this.getCacheKey(friendship.receiverId));


    switch (updateFriendshipInput.status) {
      case FriendshipStatus.ACCEPTED:
        await this.notificationsService.notifyFriendRequestAccepted(friendship.senderId, friendship.receiverId);
        break;
      case FriendshipStatus.REJECTED:
        await this.notificationsService.notifyFriendRequestRejected(friendship.senderId, friendship.receiverId);
        break;
    }

    return updatedFriendship;
  }

  async remove(id: string, userId: string) {
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        id,
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
    });

    if (!friendship) {
      throw new NotFoundException('Friendship not found');
    }

    await this.prisma.friendship.delete({
      where: { id },
    });

    await this.cacheManager.del(this.getCacheKey(friendship.senderId));
    await this.cacheManager.del(this.getCacheKey(friendship.receiverId));

    return true;
  }
}