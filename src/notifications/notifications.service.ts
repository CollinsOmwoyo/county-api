import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class NotificationsService {
  constructor(@InjectQueue('notifications') private readonly queue: Queue) {}

  async notifyUser(type: string, recipient: string, message: string) {
    await this.queue.add('send-notification', {
      type,
      recipient,
      message,
    });
  }
}
