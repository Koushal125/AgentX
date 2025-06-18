import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';  // For job queues (use Bull for async processing)

@Injectable()
export class EmailService {
  constructor(private readonly emailQueue: Queue) {}

  async sendEmailNow(to: string, subject: string, template: string, context: any): Promise<any> {
    // Sending email immediately, could integrate Nodemailer/SendGrid here
    return true;
  }

  async queueEmail(data: any): Promise<any> {
    // Queue email sending for background processing
    await this.emailQueue.add('send-email', data);
  }
}
