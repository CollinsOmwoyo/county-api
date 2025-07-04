import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  const mockAuthService = {
    validateUser: jest.fn().mockResolvedValue({ id: '1', username: 'test', role: 'CITIZEN' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('validate() should return a user object when validation succeeds', async () => {
    const result = await strategy.validate('test@example.com', 'password');
    expect(mockAuthService.validateUser).toHaveBeenCalledWith('test@example.com', 'password');
    expect(result).toEqual({ id: '1', username: 'test', role: 'CITIZEN' });
  });
});
