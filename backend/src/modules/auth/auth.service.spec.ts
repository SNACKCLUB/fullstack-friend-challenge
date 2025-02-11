import { UserService } from '@/modules/user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { mockAuthUser, mockJwtToken, mockLoginInput } from './__mocks__/auth.mock';
import { AuthService } from './auth.service';

jest.mock('bcryptjs');

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const userServiceMock = {
    findByEmail: jest.fn(),
  };

  const jwtServiceMock = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      userServiceMock.findByEmail.mockResolvedValue(mockAuthUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser(
        mockLoginInput.email,
        mockLoginInput.password,
      );

      expect(result).toEqual(mockAuthUser);
      expect(userService.findByEmail).toHaveBeenCalledWith(mockLoginInput.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        mockLoginInput.password,
        mockAuthUser.password,
      );
    });

    it('should return null if user is not found', async () => {
      userServiceMock.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser(
        mockLoginInput.email,
        mockLoginInput.password,
      );

      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      userServiceMock.findByEmail.mockResolvedValue(mockAuthUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser(
        mockLoginInput.email,
        mockLoginInput.password,
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return token and user when credentials are valid', async () => {
      const validateUserSpy = jest
        .spyOn(service, 'validateUser')
        .mockResolvedValue(mockAuthUser);
      jwtServiceMock.sign.mockReturnValue(mockJwtToken);

      const result = await service.login(mockLoginInput);

      expect(result).toEqual({
        token: mockJwtToken,
        user: mockAuthUser,
      });
      expect(validateUserSpy).toHaveBeenCalledWith(
        mockLoginInput.email,
        mockLoginInput.password,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockAuthUser.id,
        email: mockAuthUser.email,
      });
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const validateUserSpy = jest
        .spyOn(service, 'validateUser')
        .mockResolvedValue(null);

      await expect(service.login(mockLoginInput)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(validateUserSpy).toHaveBeenCalledWith(
        mockLoginInput.email,
        mockLoginInput.password,
      );
    });
  });
});