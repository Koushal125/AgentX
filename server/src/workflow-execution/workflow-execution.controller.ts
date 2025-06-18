import { Controller, Param, Post } from '@nestjs/common';
import { WorkflowExecutionService } from './workflow-execution.service';

@Controller('workflow-execution')
export class WorkflowExecutionController {
  constructor(private readonly executionService: WorkflowExecutionService) {}

  @Post(':workflowId/execute')
  async execute(@Param('workflowId') workflowId: string) {
    await this.executionService.executeWorkflow(workflowId);
    return { message: 'Workflow execution started' };
  }
}
