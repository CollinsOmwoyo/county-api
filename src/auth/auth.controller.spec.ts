import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { userRole } from '@users/enums/user-role.enum';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Partial<Record<keyof AuthService, jest.Mock>>;

  const mockUser = {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'hashed_password',
    role: userRole.CITIZEN,
  };

  const mockToken = { access_token: 'mock_token' };

  beforeEach(async () => {
    authService = {
      register: jest.fn().mockResolvedValue(mockUser),
      login: jest.fn().mockReturnValue(mockToken),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register()', () => {
    it('should call authService.register and return the result', async () => {
      const dto: CreateUserDto = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'plainpass',
        role: userRole.CITIZEN,
      };

      const result = await controller.register(dto);
      expect(authService.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('login()', () => {
    it('should call authService.login with the request user', async () => {
      const req = { user: mockUser };
      const result = await controller.login(req);
      expect(authService.login).toHaveBeenCalledWith(req.user);
      expect(result).toEqual(mockToken);
    });
  });
});
