import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignOfficerDto } from '../dto/assign-officer.dto';
import { CreateRequestDto } from '../dto/create-request.dto';
import { UpdateStatusDto } from '../dto/update-request-status.dto';
import { ServiceRequest } from '../entities/service-request.entity';
import { RequestStatus } from '../enums/request-status.enum';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(ServiceRequest)
    private readonly repo: Repository<ServiceRequest>,
  ) {}

  async create(dto: CreateRequestDto, citizenId: string): Promise<ServiceRequest> {
    // implement: load User & ServiceCatalog, then:
    const req = this.repo.create({ /* citizenId, serviceId, defaults */ });
    return this.repo.save(req);
  }

  async findByCitizen(citizenId: string): Promise<ServiceRequest[]> {
    return this.repo.find({ where: { citizen: { id: citizenId } } });
  }

  async findAll(status?: RequestStatus): Promise<ServiceRequest[]> {
    const qb = this.repo.createQueryBuilder('r')
      .leftJoinAndSelect('r.citizen','citizen')
      .leftJoinAndSelect('r.service','service')
      .leftJoinAndSelect('r.officer','officer');
    if (status) qb.where('r.status = :status', { status });
    return qb.getMany();
  }

  async assignOfficer(id: string, dto: AssignOfficerDto): Promise<ServiceRequest> {
    const req = await this.findOne(id);
    req.officer = { id: dto.officerId } as any;
    return this.repo.save(req);
  }

  async updateStatus(id: string, dto: UpdateStatusDto): Promise<ServiceRequest> {
    const req = await this.findOne(id);
    req.status = dto.status;
    return this.repo.save(req);
  }

  async findOne(id: string): Promise<ServiceRequest> {
    const req = await this.repo.findOneBy({ id });
    if (!req) throw new NotFoundException(`Request ${id} not found`);
    return req;
  }
}
