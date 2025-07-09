import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifications')
export class Notification {
  @ApiProperty({ example: 'uuid-v4', description: 'Unique ID of the notification' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'email', description: 'Type of notification (email, sms, in-app)' })
  @Column()
  type: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Recipient of the notification' })
  @Column()
  recipient: string;

  @ApiProperty({ example: 'Your request has been approved.', description: 'Message body' })
  @Column('text')
  message: string;

  @ApiProperty({ example: true, description: 'Whether the notification was successfully sent' })
  @Column({ default: false })
  sent: boolean;

  @ApiProperty({ description: 'Date and time when the notification was created' })
  @CreateDateColumn()
  createdAt: Date;
}
