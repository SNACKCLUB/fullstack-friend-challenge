import { UserService } from '@/modules/user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mockAuthUser } from '../__mocks__/auth.mock';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let userService: UserService;

  const userServiceMock = {
    findOne: jest.fn(),
  };

  const configServiceMock = {
    get: jest.fn().mockReturnValue('test-secret'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    userService = module.get<UserService>(UserService);
  });

  describe('validate', () => {
    const payload = {
      sub: mockAuthUser.id,
      email: mockAuthUser.email,
    };

    it('should return user if token payload is valid', async () => {
      userServiceMock.findOne.mockResolvedValue(mockAuthUser);

      const result = await strategy.validate(payload);

      expect(result).toEqual(mockAuthUser);
      expect(userService.findOne).toHaveBeenCalledWith(payload.sub);
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      userServiceMock.findOne.mockResolvedValue(null);

      await expect(strategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(userService.findOne).toHaveBeenCalledWith(payload.sub);
    });
  });
});