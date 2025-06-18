import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomHandler {
  async handle(step: any): Promise<void> {
    console.log('Executing custom logic:', step.config);
  }
}
