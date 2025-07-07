import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly repo: Repository<AuditLog>,
  ) {}

  async log(userId: string, action: string, entity: string, entityId: string) {
    const entry = this.repo.create({ user: { id: userId } as any, action, entity, entityId });
    await this.repo.save(entry);
  }
}
