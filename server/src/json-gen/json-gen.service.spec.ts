import { Test, TestingModule } from '@nestjs/testing';
import { JsonGenService } from './json-gen.service';

describe('JsonGenService', () => {
  let service: JsonGenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonGenService],
    }).compile();

    service = module.get<JsonGenService>(JsonGenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
