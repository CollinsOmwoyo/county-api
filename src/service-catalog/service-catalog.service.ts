import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceCatalog } from './entities/service-catalog.entity';

@Injectable()
export class ServiceCatalogService {
  constructor(
    @InjectRepository(ServiceCatalog)
    private readonly serviceRepository: Repository<ServiceCatalog>,
  ) {}

  async create(createDto: CreateServiceDto): Promise<ServiceCatalog> {
    const newService = this.serviceRepository.create(createDto);
    return await this.serviceRepository.save(newService);
  }

  async findAll(): Promise<ServiceCatalog[]> {
    return await this.serviceRepository.find();
  }

  async findOne(id: string): Promise<ServiceCatalog> {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Service with ID '${id}' not found.`);
    }
    return service;
  }

  async update(id: string, updateDto: UpdateServiceDto): Promise<ServiceCatalog> {
    const existingService = await this.findOne(id);
    const updated = this.serviceRepository.merge(existingService, updateDto);
    return await this.serviceRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const service = await this.findOne(id);
    await this.serviceRepository.remove(service);
  }
}
