import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { WixService } from './wix.service';
import { PrismaService } from './prisma.service';
import { LoggerService } from './log.service';
import { LogController } from './logs.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule],
  controllers: [AppController, LogController],
  providers: [AppService, WixService, PrismaService, LoggerService],
})
export class AppModule {}
