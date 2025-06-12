import { Module } from '@nestjs/common';
import { JsonGenController } from './json-gen.controller';
import { JsonGenService } from './json-gen.service';

@Module({
  controllers: [JsonGenController],
  providers: [JsonGenService]
})
export class JsonGenModule {}
