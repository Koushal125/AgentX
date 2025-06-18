import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowExecutionController } from './workflow-execution.controller';

describe('WorkflowExecutionController', () => {
  let controller: WorkflowExecutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowExecutionController],
    }).compile();

    controller = module.get<WorkflowExecutionController>(WorkflowExecutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
