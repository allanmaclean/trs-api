import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

// In an instance where types are shared between frontend and backend, there's various solutions such as shared npm types packages
const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
export type Direction = typeof DIRECTIONS[number];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('position')
  updatePosition(@Body() position: { x: number; y: number, direction: Direction }): Promise<string> {

    return this.appService.updatePosition(position.x, position.y, position.direction).then(() => {
      return 'Position updated';
    }).catch((error) => {
      console.error('Error updating position:', error);
      throw error;
    });
  }
}
