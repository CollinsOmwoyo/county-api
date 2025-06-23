import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { userRole } from './enums/user-role.enum';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<Repository<User>>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should hash the password and save the user', async () => {
      const dto = {
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        password: 'plainpass',
        role: userRole.CITIZEN,
      };

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

      const mockUser = { ...dto, password: hashedPassword, id: 'uuid' };
      mockUserRepository.create.mockReturnValue(mockUser as User);
      mockUserRepository.save.mockResolvedValue(mockUser as User);

      const result = await service.create(dto);

      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...dto,
        password: hashedPassword,
      });
      expect(mockUserRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });
});

