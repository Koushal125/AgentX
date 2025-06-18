import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailHandler {
  async handle(step: any): Promise<void> {
    console.log('Sending email to:', step.config?.to);
    // Integrate with your EmailService later
  }
}
