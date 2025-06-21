import { Controller, Post, Body } from '@nestjs/common';
import { JsonGenService } from './json-gen.service';

@Controller('json-gen')
export class JsonGenController {
  constructor(
    private readonly jsonGenService: JsonGenService
  ){}
  
  @Post('generate')
  async generateJson(
    @Body() body : {prompt : string}
  ) : Promise<JSON>{
    return this.jsonGenService.generateJson(body.prompt)
  }
  
  
}
