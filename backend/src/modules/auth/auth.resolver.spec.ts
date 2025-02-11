import { Test, TestingModule } from '@nestjs/testing';
import { mockAuthUser, mockJwtToken, mockLoginInput } from './__mocks__/auth.mock';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: AuthService;

  const authServiceMock = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get<AuthService>(AuthService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return token and user', async () => {
      const loginResponse = {
        token: mockJwtToken,
        user: mockAuthUser,
      };
      authServiceMock.login.mockResolvedValue(loginResponse);

      const result = await resolver.login(mockLoginInput);

      expect(result).toEqual(loginResponse);
      expect(service.login).toHaveBeenCalledWith(mockLoginInput);
    });
  });

  describe('me', () => {
    it('should return the current user', async () => {
      const result = await resolver.me(mockAuthUser);
      
      expect(result).toEqual(mockAuthUser);
    });
  });
});