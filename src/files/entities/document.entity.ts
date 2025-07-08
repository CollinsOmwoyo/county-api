import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ServiceRequest } from '../../requests/entities/service-request.entity';

@Entity('documents')
export class Document {
  @ApiProperty({ example: 'uuid-v4', description: 'Document ID' })
  @PrimaryGeneratedColumn('uuid') id: string;

  @ApiProperty({ description: 'Original filename' })
  @Column() filename: string;

  @ApiProperty({ description: 'Secure URL from Cloudinary' })
  @Column() url: string;

  @ManyToOne(() => ServiceRequest, req => req.documents, { onDelete: 'CASCADE' })
  request: ServiceRequest;

  @ApiProperty({ description: 'Uploaded timestamp' })
  @CreateDateColumn() createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  @UpdateDateColumn() updatedAt: Date;
}
