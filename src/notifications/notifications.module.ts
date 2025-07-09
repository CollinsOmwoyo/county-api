import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { NotificationProcessor } from './notification.processor';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationProcessor, NotificationsService],
})
export class NotificationsModule {}
