import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { userRole } from '@users/enums/user-role.enum';
import { UsersService } from '@users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockResolvedValue(true),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    create: jest.fn(),
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should call usersService.create with dto', async () => {
      const dto: CreateUserDto = {
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'jane@example.com',
        password: 'pass',
        role: userRole.CITIZEN,
      };

      const expectedUser = { ...dto, id: '123', password: 'hashed_password' };
      mockUsersService.create.mockResolvedValue(expectedUser);

      const result = await service.register(dto);
      expect(result).toEqual(expectedUser);
      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('validateUser', () => {
    it('should return user if password matches', async () => {
      const mockUser = { id: '1', email: 'a@a.com', password: 'hashed_password' };
      mockUsersService.findByEmail.mockResolvedValue(mockUser);

      const result = await service.validateUser('a@a.com', 'pass');
      expect(result).toEqual(mockUser);
    });

    it('should return null if password does not match', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      mockUsersService.findByEmail.mockResolvedValue({ password: 'wrong' });

      const result = await service.validateUser('a@a.com', 'wrongpass');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access_token for valid user', async () => {
      const user = { id: '1', username: 'jane', role: 'CITIZEN' };

      const result = await service.login(user);
      expect(result).toEqual({ access_token: 'mock-jwt-token' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: user.username,
        sub: user.id,
        role: user.role,
      });
    });
  });
});
