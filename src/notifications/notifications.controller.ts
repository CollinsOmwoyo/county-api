import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Send or queue a notification' })
  @ApiResponse({ status: 201, description: 'Notification successfully queued' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiBody({ type: CreateNotificationDto })
  async sendNotification(@Body() dto: CreateNotificationDto) {
    await this.notificationsService.notifyUser(dto.type, dto.recipient, dto.message);
    return { message: 'Notification has been queued.' };
  }
}
