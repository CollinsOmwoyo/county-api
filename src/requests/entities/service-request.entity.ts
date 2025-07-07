import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ServiceCatalog } from '../../service-catalog/entities/service-catalog.entity';
import { User } from '../../users/entities/user.entity';
import { RequestStatus } from '../enums/request-status.enum';

@Entity('requests')
export class ServiceRequest {
  @ApiProperty({ example: 'uuid-v4', description: 'Request ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (u) => u.requests, { eager: true })
  citizen: User;

  @ApiProperty({ type: () => ServiceCatalog })
  @ManyToOne(() => ServiceCatalog, (s) => s.requests, { eager: true })
  service: ServiceCatalog;

  @ApiProperty({ type: () => User, nullable: true })
  @ManyToOne(() => User, { nullable: true, eager: true })
  officer?: User;

  @ApiProperty({ enum: RequestStatus, example: RequestStatus.PENDING })
  @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.PENDING })
  status: RequestStatus;

  @ApiProperty({ description: 'When request was created' })
  @CreateDateColumn() createdAt: Date;

  @ApiProperty({ description: 'When request was last updated' })
  @UpdateDateColumn() updatedAt: Date;
}
