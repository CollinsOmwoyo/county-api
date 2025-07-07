import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger('Notifications');

  notifyUser(userId: string, message: string) {
    this.logger.log(`Notify User ${userId}: ${message}`);
  }

  notifyOfficer(officerId: string, message: string) {
    this.logger.log(`Notify Officer ${officerId}: ${message}`);
  }
}
