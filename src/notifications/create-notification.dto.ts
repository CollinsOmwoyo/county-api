import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    example: 'email',
    description: 'Type of notification (e.g., email, sms)',
  })
  @IsString()
  @IsIn(['email', 'sms', 'push'])
  type: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Recipient identifier (email, phone, or user ID)',
  })
  @IsString()
  @IsEmail()
  recipient: string;

  @ApiProperty({
    example: 'Your request has been approved.',
    description: 'Notification message content',
  })
  @IsString()
  message: string;
}
