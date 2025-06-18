import { Module } from '@nestjs/common';
import { WorkflowExecutionService } from './workflow-execution.service';
import { WorkflowExecutionController } from './workflow-execution.controller';

@Module({
  providers: [WorkflowExecutionService],
  controllers: [WorkflowExecutionController]
})
export class WorkflowExecutionModule {}
