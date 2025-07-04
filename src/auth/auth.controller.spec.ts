import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(dto => ({
      id: '123',
      ...dto,
    })),
    login: jest.fn(user => ({
      access_token: 'mock-token',
      user,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const dto: CreateUserDto = {
        name: 'John Doe',
        username: 'john',
        email: 'john@example.com',
        password: 'pass123',
        role: 'CITIZEN',
      };

      const result = await controller.register(dto);
      expect(result).toEqual({ id: '123', ...dto });
      expect(mockAuthService.register).toHaveBeenCalledWith(dto);
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const mockUser = {
        id: '123',
        username: 'john',
        role: 'CITIZEN',
      };

      const result = await controller.login({ user: mockUser } as any);
      expect(result).toEqual({ access_token: 'mock-token', user: mockUser });
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
    });
  });
});
