import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateJsonFromPrompt } from 'src/utils/get-json';

@Injectable()
export class JsonGenService {
  constructor(
    private readonly prisma : PrismaService
  ) {}

  async generateJson(
    prompt : string
  ) : Promise<JSON>{
    try{
      const jsonGenrated = await generateJsonFromPrompt(prompt)
      return jsonGenrated
    }catch(error){
      console.log("error in generating json ",error)
      throw error
    }
  }
}
