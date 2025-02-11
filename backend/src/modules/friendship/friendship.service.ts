import { PrismaService } from '@/prisma/prisma.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendshipInput } from './dto/create-friendship.input';
import { UpdateFriendshipInput } from './dto/update-friendship.input';
import { FriendshipStatus } from './models/friendship.model';

@Injectable()
export class FriendshipService {
  constructor(private prisma: PrismaService) {}

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

    const receiver = await this.prisma.user.findUnique({
      where: { id: createFriendshipInput.receiverId },
    });

    if (!receiver) {
      throw new NotFoundException('Receiver not found');
    }

    return this.prisma.friendship.create({
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
  }

  async findUserFriendships(userId: string) {
    return this.prisma.friendship.findMany({
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

    return this.prisma.friendship.update({
      where: { id },
      data: {
        status: updateFriendshipInput.status,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
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

    return true;
  }
}