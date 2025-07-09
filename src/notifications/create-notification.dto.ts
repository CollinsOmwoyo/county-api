import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ example: 'email', description: 'Type of notification (email, sms)' })
  type: string;

  @ApiProperty({ example: 'user@example.com', description: 'Recipient of the notification' })
  recipient: string;

  @ApiProperty({ example: 'Your application was approved.', description: 'Message content' })
  message: string;
}
