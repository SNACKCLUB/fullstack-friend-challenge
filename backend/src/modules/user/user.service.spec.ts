import { PrismaService } from '@/prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { mockCreateUserInput, mockUpdateUserInput, mockUser } from './__mocks__/user.mock';
import { UserService } from './user.service';

jest.mock('bcryptjs');

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  const prismaServiceMock = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      prismaServiceMock.user.findUnique.mockResolvedValue(null);
      prismaServiceMock.user.create.mockResolvedValue(mockUser);

      const result = await service.create(mockCreateUserInput);

      expect(result).toEqual(mockUser);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          ...mockCreateUserInput,
          password: 'hashedPassword',
        },
      });
    });

    it('should throw ConflictException if email already exists', async () => {
      prismaServiceMock.user.findUnique.mockResolvedValue(mockUser);

      await expect(service.create(mockCreateUserInput)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      prismaServiceMock.user.findMany.mockResolvedValue([mockUser]);

      const result = await service.findAll();

      expect(result).toEqual([mockUser]);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      prismaServiceMock.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne('1');

      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      prismaServiceMock.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      prismaServiceMock.user.findUnique.mockResolvedValue(mockUser);
      prismaServiceMock.user.update.mockResolvedValue({
        ...mockUser,
        ...mockUpdateUserInput,
      });

      const result = await service.update('1', mockUpdateUserInput);

      expect(result).toEqual({ ...mockUser, ...mockUpdateUserInput });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: mockUpdateUserInput,
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      prismaServiceMock.user.findUnique.mockResolvedValue(null);

      await expect(service.update('1', mockUpdateUserInput)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user successfully', async () => {
      prismaServiceMock.user.findUnique.mockResolvedValue(mockUser);
      prismaServiceMock.user.delete.mockResolvedValue(mockUser);

      const result = await service.remove('1');

      expect(result).toBe(true);
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      prismaServiceMock.user.findUnique.mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});