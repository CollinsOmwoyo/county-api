import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceCatalog } from './entities/service-catalog.entity';
import { CreateServiceCatalogDto } from './dto/create-service-catalog.dto';
import { UpdateServiceCatalogDto } from './dto/update-service-catalog.dto';


@Injectable()
export class ServiceCatalogService {
  constructor(
    @InjectRepository(ServiceCatalog)
    private readonly serviceRepository: Repository<ServiceCatalog>,
  ) {}

  async create(createDto: CreateServiceCatalogDto): Promise<ServiceCatalog> {
    const service = this.serviceRepository.create(createDto);
    return this.serviceRepository.save(service);
  }

  async findAll(): Promise<ServiceCatalog[]> {
    return this.serviceRepository.find();
  }

  async findOne(id: string): Promise<ServiceCatalog> {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return service;
  }

  async update(id: string, updateDto: UpdateServiceCatalogDto): Promise<ServiceCatalog> {
    const service = await this.findOne(id);
    Object.assign(service, updateDto);
    return this.serviceRepository.save(service);
  }

  async remove(id: string): Promise<void> {
    const service = await this.findOne(id);
    await this.serviceRepository.remove(service);
  }
}
