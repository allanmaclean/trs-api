import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('position')
  updatePosition(@Body() position: { x: number; y: number }): string {
    console.log('Position updated:', position);
    return 'Position updated';
  }
}
