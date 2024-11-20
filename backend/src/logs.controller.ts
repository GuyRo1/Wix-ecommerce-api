import { Controller, Get, Post } from '@nestjs/common';
import { LoggerService } from './log.service';

@Controller('logs')
export class LogController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get()
  async getAllLogs() {
    return this.loggerService.getAllLogs();
  }

  @Post('clear')
  async clear() {
    return this.loggerService.clearLogs();
  }
}
