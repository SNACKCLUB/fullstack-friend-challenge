import { Test, TestingModule } from '@nestjs/testing';
import { mockAuthUser } from '../auth/__mocks__/auth.mock';
import { mockCreateFriendshipInput, mockFriendship } from './__mocks__/friendship.mock';
import { FriendshipResolver } from './friendship.resolver';
import { FriendshipService } from './friendship.service';
import { FriendshipStatus } from './models/friendship.model';

describe('FriendshipResolver', () => {
  let resolver: FriendshipResolver;
  let service: FriendshipService;

  const friendshipServiceMock = {
    create: jest.fn(),
    findUserFriendships: jest.fn(),
    findUserFriends: jest.fn(),
    findPendingRequests: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FriendshipResolver,
        {
          provide: FriendshipService,
          useValue: friendshipServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<FriendshipResolver>(FriendshipResolver);
    service = module.get<FriendshipService>(FriendshipService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendFriendRequest', () => {
    it('should create a friend request', async () => {
      friendshipServiceMock.create.mockResolvedValue(mockFriendship);

      const result = await resolver.sendFriendRequest(
        mockAuthUser,
        mockCreateFriendshipInput,
      );

      expect(result).toEqual(mockFriendship);
      expect(service.create).toHaveBeenCalledWith(
        mockAuthUser.id,
        mockCreateFriendshipInput,
      );
    });
  });

  describe('myFriendships', () => {
    it('should return all friendships', async () => {
      friendshipServiceMock.findUserFriendships.mockResolvedValue([mockFriendship]);

      const result = await resolver.myFriendships(mockAuthUser);

      expect(result).toEqual([mockFriendship]);
      expect(service.findUserFriendships).toHaveBeenCalledWith(mockAuthUser.id);
    });
  });

  describe('myFriends', () => {
    it('should return all friends', async () => {
      friendshipServiceMock.findUserFriends.mockResolvedValue([mockAuthUser]);

      const result = await resolver.myFriends(mockAuthUser);

      expect(result).toEqual([mockAuthUser]);
      expect(service.findUserFriends).toHaveBeenCalledWith(mockAuthUser.id);
    });
  });

  describe('pendingFriendRequests', () => {
    it('should return pending friend requests', async () => {
      friendshipServiceMock.findPendingRequests.mockResolvedValue([mockFriendship]);

      const result = await resolver.pendingFriendRequests(mockAuthUser);

      expect(result).toEqual([mockFriendship]);
      expect(service.findPendingRequests).toHaveBeenCalledWith(mockAuthUser.id);
    });
  });

  describe('respondToFriendRequest', () => {
    it('should update friend request status', async () => {
      friendshipServiceMock.update.mockResolvedValue(mockFriendship);

      const result = await resolver.respondToFriendRequest(
        mockAuthUser,
        mockFriendship.id,
        { status: FriendshipStatus.ACCEPTED },
      );

      expect(result).toEqual(mockFriendship);
      expect(service.update).toHaveBeenCalledWith(
        mockFriendship.id,
        mockAuthUser.id,
        { status: FriendshipStatus.ACCEPTED },
      );
    });
  });

  describe('removeFriend', () => {
    it('should remove friendship', async () => {
      friendshipServiceMock.remove.mockResolvedValue(true);

      const result = await resolver.removeFriend(
        mockAuthUser,
        mockFriendship.id,
      );

      expect(result).toBe(true);
      expect(service.remove).toHaveBeenCalledWith(
        mockFriendship.id,
        mockAuthUser.id,
      );
    });
  });
});