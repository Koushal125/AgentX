import { Injectable } from '@nestjs/common';
import { WorkflowService } from '../workflow/workflow.service';
import { EmailHandler } from './handlers/email.handler';
import { NotificationHandler } from './handlers/notification.handler';
import { CustomHandler } from './handlers/custom.handler';
import { PrismaClient, ExecutionStatus } from '@prisma/client';

@Injectable()
export class WorkflowExecutionService {
  private prisma = new PrismaClient();

  constructor(
    private readonly workflowService: WorkflowService,
    private readonly emailHandler: EmailHandler,
    private readonly notificationHandler: NotificationHandler,
    private readonly customHandler: CustomHandler,
  ) {}

  async executeWorkflow(workflowId: string, triggeredBy: string): Promise<void> {
    const workflow = await this.workflowService.findOne(workflowId);
    if (!workflow || !workflow.steps || workflow.steps.length === 0) {
      throw new Error('Invalid or empty workflow');
    }

    // Create WorkflowExecution record
    const execution = await this.prisma.workflowExecution.create({
      data: {
        workflowId: workflow.id,
        triggeredBy,
        status: ExecutionStatus.RUNNING,
        totalSteps: workflow.steps.length,
      },
    });

    for (const step of workflow.steps) {
      let status: ExecutionStatus = ExecutionStatus.COMPLETED;
      let error: string | null = null;

      try {
        switch (step.action) {
          case 'SEND_EMAIL':
            await this.emailHandler.handle(step);
            break;
          case 'SEND_NOTIFICATION':
            await this.notificationHandler.handle(step);
            break;
          case 'CUSTOM_ACTION':
            await this.customHandler.handle(step);
            break;
          default:
            throw new Error(`Unknown step action: ${step.action}`);
        }
      } catch (err) {
        status = ExecutionStatus.FAILED;
        error = err.message || 'Step execution failed';
        console.error(`Step ${step.name} failed:`, err);
      }

      // Create StepExecution record
      await this.prisma.stepExecution.create({
        data: {
          executionId: execution.id,
          stepId: step.id,
          status,
          error,
        },
      });
    }

    // Finalize WorkflowExecution
    await this.prisma.workflowExecution.update({
      where: { id: execution.id },
      data: {
        status: ExecutionStatus.COMPLETED,
        completedAt: new Date(),
      },
    });
  }
}
