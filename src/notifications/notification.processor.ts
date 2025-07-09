import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('notifications')
export class NotificationProcessor {
  @Process('send-notification')
  async handleNotification(job: Job) {
    const { type, recipient, message } = job.data;

    //(SMS, email, in-app, etc.)
    console.log(`📨 [${type}] to ${recipient}: ${message}`);
  }
}
