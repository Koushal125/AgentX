import { Module } from '@nestjs/common';
import { WorkflowExecutionService } from './workflow-execution.service';
import { WorkflowExecutionController } from './workflow-execution.controller';
import { WorkflowModule } from '../workflow/workflow.module';
import { EmailHandler } from './handlers/email.handler';
import { NotificationHandler } from './handlers/notification.handler';
import { CustomHandler } from './handlers/custom.handler';

@Module({
  imports: [WorkflowModule],
  controllers: [WorkflowExecutionController],
  providers: [
    WorkflowExecutionService,
    EmailHandler,
    NotificationHandler,
    CustomHandler,
  ],
})
export class WorkflowExecutionModule {}
