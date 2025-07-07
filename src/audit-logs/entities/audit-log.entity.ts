import { ApiProperty } from '@nestjs/swagger';
import {
    Column, CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('audit_logs')
export class AuditLog {
  @ApiProperty({ description: 'Audit entry ID' })
  @PrimaryGeneratedColumn('uuid') id: string;

  @ApiProperty({ description: 'Actor user' })
  @ManyToOne(() => User, { eager: true }) user: User;

  @ApiProperty({ description: 'Action performed' })
  @Column() action: string;

  @ApiProperty({ description: 'Entity name' })
  @Column() entity: string;

  @ApiProperty({ description: 'Entity ID affected' })
  @Column() entityId: string;

  @ApiProperty({ description: 'Timestamp of action' })
  @CreateDateColumn() timestamp: Date;
}
