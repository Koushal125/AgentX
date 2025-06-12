import { Test, TestingModule } from '@nestjs/testing';
import { JsonGenController } from './json-gen.controller';

describe('JsonGenController', () => {
  let controller: JsonGenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JsonGenController],
    }).compile();

    controller = module.get<JsonGenController>(JsonGenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
