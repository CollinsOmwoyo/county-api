import { Test, TestingModule } from '@nestjs/testing';
import { ServiceCatalogController } from './service-catalog.controller';
import { ServiceCatalogService } from './service-catalog.service';

describe('ServiceCatalogController', () => {
  let controller: ServiceCatalogController;

  // Mock service
  const mockServiceCatalogService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceCatalogController],
      providers: [
        {
          provide: ServiceCatalogService,
          useValue: mockServiceCatalogService,
        },
      ],
    }).compile();

    controller = module.get<ServiceCatalogController>(ServiceCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
