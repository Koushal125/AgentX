import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JsonGenModule } from './json-gen/json-gen.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [JsonGenModule, PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
