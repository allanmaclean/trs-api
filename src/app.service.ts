import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  updatePosition(x: number, y: number): string {
    console.log('Position updated:', { x, y });
    return 'Position updated';
  }
}
