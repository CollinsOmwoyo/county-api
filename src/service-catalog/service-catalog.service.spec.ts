import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceCatalog } from './entities/service-catalog.entity';
import { ServiceCatalogService } from './service-catalog.service';

describe('ServiceCatalogService', () => {
  let service: ServiceCatalogService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceCatalogService,
        {
          provide: getRepositoryToken(ServiceCatalog),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ServiceCatalogService>(ServiceCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
