import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JsonGenModule } from './json-gen/json-gen.module';
import { UserModule } from './user/user.module';
import { WorkflowModule } from './workflow/workflow.module';
import { WorkflowExecutionModule } from './workflow-execution/workflow-execution.module';

@Module({
  imports: [JsonGenModule, PrismaModule, UserModule, WorkflowModule, WorkflowExecutionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
