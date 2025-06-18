import { IsString, IsOptional, IsEnum, IsBoolean, IsNumber } from 'class-validator';
import { Priority, WorkflowStatus } from '@prisma/client';

export class CreateWorkflowDto {
  @IsString() name: string;
  @IsOptional() @IsString() description?: string;

  @IsString() originalPrompt: string;
  @IsString() prompt: string;

  @IsOptional() jsonPlan: any; // allow JSON from frontend

  @IsOptional() @IsString() flowScript?: string;
  @IsEnum(WorkflowStatus) status?: WorkflowStatus = WorkflowStatus.DRAFT;

  @IsOptional() @IsNumber() version?: number = 1;
  @IsOptional() @IsBoolean() isActive?: boolean = true;
  @IsOptional() @IsEnum(Priority) priority?: Priority = Priority.MEDIUM;

  @IsString() createdBy: string;
}
