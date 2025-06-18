import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationHandler {
  async handle(step: any): Promise<void> {
    console.log('Sending notification:', step.config?.message);
  }
}
