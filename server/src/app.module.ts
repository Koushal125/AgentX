import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JsonGenModule } from './json-gen/json-gen.module';

@Module({
  imports: [JsonGenModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
