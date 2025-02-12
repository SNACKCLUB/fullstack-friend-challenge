import { Test, TestingModule } from '@nestjs/testing';
import { mockCreateUserInput, mockUpdateUserInput, mockUser } from './__mocks__/user.mock';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { FriendshipService } from '../friendship/friendship.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  const userServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

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
        UserResolver,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: FriendshipService,
          useValue: friendshipServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      userServiceMock.create.mockResolvedValue(mockUser);

      const result = await resolver.createUser(mockCreateUserInput);

      expect(result).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledWith(mockCreateUserInput);
    });
  });

  describe('users', () => {
    it('should return an array of users', async () => {
      userServiceMock.findAll.mockResolvedValue([mockUser]);

      const result = await resolver.users();

      expect(result).toEqual([mockUser]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('user', () => {
    it('should return a single user', async () => {
      userServiceMock.findOne.mockResolvedValue(mockUser);

      const result = await resolver.user(mockUser.id);

      expect(result).toEqual(mockUser);
      expect(service.findOne).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updatedUser = { ...mockUser, ...mockUpdateUserInput };
      userServiceMock.update.mockResolvedValue(updatedUser);

      const result = await resolver.updateUser(
        mockUser.id,
        mockUpdateUserInput,
        mockUser,
      );

      expect(result).toEqual(updatedUser);
      expect(service.update).toHaveBeenCalledWith(mockUser.id, mockUpdateUserInput);
    });

    it('should throw error if trying to update different user', async () => {
      await expect(
        resolver.updateUser('different-id', mockUpdateUserInput, mockUser),
      ).rejects.toThrow('You can only update your own profile');
    });
  });

  describe('removeUser', () => {
    it('should remove a user', async () => {
      userServiceMock.remove.mockResolvedValue(true);

      const result = await resolver.removeUser(mockUser.id, mockUser);

      expect(result).toBe(true);
      expect(service.remove).toHaveBeenCalledWith(mockUser.id);
    });

    it('should throw error if trying to remove different user', async () => {
      await expect(
        resolver.removeUser('different-id', mockUser),
      ).rejects.toThrow('You can only remove your own profile');
    });
  });
});