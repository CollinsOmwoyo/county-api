import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceRequest } from '../../requests/entities/service-request.entity';

@Entity()
export class ServiceCatalog {
  @ApiProperty({ example: 'uuid-v4', description: 'Unique identifier of the service' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Water Connection', description: 'Name of the service' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({
    example: 'A municipal service to connect households to piped water.',
    description: 'Detailed description of the service',
  })
  @Column('text')
  description: string;

  @ApiProperty({ example: 'Public Works', description: 'Department offering the service' })
  @Column({ length: 100 })
  category: string;

  @ApiProperty({ example: true, description: 'Whether the service is currently active' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Timestamp when the service was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the service was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ServiceRequest, request => request.service)
  requests: ServiceRequest[];
}
