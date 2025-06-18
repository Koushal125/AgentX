import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, WorkflowStatus, Priority } from '@prisma/client';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';

@Injectable()
export class WorkflowService {
  private prisma = new PrismaClient();

  async create(data: CreateWorkflowDto) {
    return this.prisma.workflow.create({ data });
  }

  async findAll() {
    return this.prisma.workflow.findMany();
  }

  async findOne(id: string) {
    const workflow = await this.prisma.workflow.findUnique({ where: { id } });
    if (!workflow) throw new NotFoundException('Workflow not found');
    return workflow;
  }

  async update(id: string, data: UpdateWorkflowDto) {
    return this.prisma.workflow.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.workflow.delete({ where: { id } });
  }

  async validatePlan(plan: any): Promise<{ valid: boolean; errors?: string[] }> {
    const errors: string[] = [];

    // Example validation
    if (!plan.steps || !Array.isArray(plan.steps)) {
      errors.push('Missing or invalid steps array');
    }

    // More checks here...

    return { valid: errors.length === 0, errors };
  }
}
