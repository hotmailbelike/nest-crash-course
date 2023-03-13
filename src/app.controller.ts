import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('root')
@Controller('api') //now it's in localhost:3000/api instead of localhost:3000
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('sayHi') //now it's in localhost:3000/api/sayHi instead of localhost:3000/api
  getHello(): string {
    return this.appService.getHello();
  }
}
