import { PrismaService } from '@/prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockCreateFriendshipInput, mockFriendship } from './__mocks__/friendship.mock';
import { FriendshipService } from './friendship.service';
import { FriendshipStatus } from './models/friendship.model';
import { NotificationsService } from '../notifications/notifications.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

jest.mock('@nestjs/cache-manager', () => ({
  ...jest.requireActual('@nestjs/cache-manager'),
  CACHE_MANAGER: 'CACHE_MANAGER',
}));

describe('FriendshipService', () => {
  let service: FriendshipService;
  let prisma: PrismaService;

  const prismaServiceMock = {
    friendship: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  const notificationsServiceMock = {
    create: jest.fn(),
    notifyFriendRequestAccepted: jest.fn(),
    notifyFriendRequestRejected: jest.fn(),
    notifyFriendRequest: jest.fn(),
  };

  
  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FriendshipService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
        {
          provide: NotificationsService,
          useValue: notificationsServiceMock,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<FriendshipService>(FriendshipService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const senderId = '1';

    it('should create a friendship request successfully', async () => {
      prismaServiceMock.friendship.findFirst.mockResolvedValue(null);
      prismaServiceMock.user.findUnique.mockResolvedValue({ id: '2' });
      prismaServiceMock.friendship.create.mockResolvedValue(mockFriendship);

      const result = await service.create(senderId, mockCreateFriendshipInput);

      expect(result).toEqual(mockFriendship);
      expect(prisma.friendship.create).toHaveBeenCalledWith({
        data: {
          senderId,
          receiverId: mockCreateFriendshipInput.receiverId,
          status: FriendshipStatus.PENDING,
        },
        include: {
          sender: true,
          receiver: true,
        },
      });
    });

    it('should throw ConflictException if friendship request already exists', async () => {
      prismaServiceMock.friendship.findFirst.mockResolvedValue(mockFriendship);

      await expect(
        service.create(senderId, mockCreateFriendshipInput),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException if receiver does not exist', async () => {
      prismaServiceMock.friendship.findFirst.mockResolvedValue(null);
      prismaServiceMock.user.findUnique.mockResolvedValue(null);

      await expect(
        service.create(senderId, mockCreateFriendshipInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findUserFriendships', () => {
    it('should return all user friendships', async () => {
      prismaServiceMock.friendship.findMany.mockResolvedValue([mockFriendship]);

      const result = await service.findUserFriendships('1');

      expect(result).toEqual([mockFriendship]);
      expect(prisma.friendship.findMany).toHaveBeenCalledWith({
        where: {
          OR: [{ senderId: '1' }, { receiverId: '1' }],
        },
        include: {
          sender: true,
          receiver: true,
        },
      });
    });
  });

  describe('findUserFriends', () => {
    it('should return all accepted friends', async () => {
      const acceptedFriendship = { ...mockFriendship, status: FriendshipStatus.ACCEPTED };
      prismaServiceMock.friendship.findMany.mockResolvedValue([acceptedFriendship]);

      const result = await service.findUserFriends('1');

      expect(result).toEqual([acceptedFriendship.receiver]);
      expect(prisma.friendship.findMany).toHaveBeenCalledWith({
        where: {
          OR: [{ senderId: '1' }, { receiverId: '1' }],
          status: FriendshipStatus.ACCEPTED,
        },
        include: {
          sender: true,
          receiver: true,
        },
      });
    });
  });

  describe('findPendingRequests', () => {
    it('should return all pending friend requests', async () => {
      prismaServiceMock.friendship.findMany.mockResolvedValue([mockFriendship]);

      const result = await service.findPendingRequests('1');

      expect(result).toEqual([mockFriendship]);
      expect(prisma.friendship.findMany).toHaveBeenCalledWith({
        where: {
          receiverId: '1',
          status: FriendshipStatus.PENDING,
        },
        include: {
          sender: true,
          receiver: true,
        },
      });
    });
  });

  describe('update', () => {
    it('should update friendship status successfully', async () => {
      prismaServiceMock.friendship.findFirst.mockResolvedValue(mockFriendship);
      prismaServiceMock.friendship.update.mockResolvedValue({
        ...mockFriendship,
        status: FriendshipStatus.ACCEPTED,
      });

      const result = await service.update(
        '1',
        '2',
        { status: FriendshipStatus.ACCEPTED },
      );

      expect(result.status).toBe(FriendshipStatus.ACCEPTED);
      expect(prisma.friendship.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { status: FriendshipStatus.ACCEPTED },
        include: {
          sender: true,
          receiver: true,
        },
      });
    });

    it('should throw NotFoundException if friendship request not found', async () => {
      prismaServiceMock.friendship.findFirst.mockResolvedValue(null);

      await expect(
        service.update('1', '2', { status: FriendshipStatus.ACCEPTED }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove friendship successfully', async () => {
      prismaServiceMock.friendship.findFirst.mockResolvedValue(mockFriendship);
      prismaServiceMock.friendship.delete.mockResolvedValue(mockFriendship);

      const result = await service.remove('1', '2');

      expect(result).toBe(true);
      expect(prisma.friendship.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if friendship not found', async () => {
      prismaServiceMock.friendship.findFirst.mockResolvedValue(null);

      await expect(service.remove('1', '2')).rejects.toThrow(NotFoundException);
    });
  });
});