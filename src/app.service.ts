import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Moves } from './moves.entity';
import { Repository } from 'typeorm';
import { Direction } from './app.controller';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Moves)
    private movesRepository: Repository<Moves>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async updatePosition(x: number, y: number, direction: Direction): Promise<Moves> {
    // console.log('Position updated:', { x, y });
    // const move = this.movesRepository.create({ move: `PLACE ${x},${y}` });
    // return await this.movesRepository.save(move);
    // // return 'Position updated';
    try {
      console.log('Position updated:', { x, y, direction });
      const move = this.movesRepository.create({ move: `PLACE ${x},${y},${direction}` });
      return await this.movesRepository.save(move);
    } catch (error) {
      console.error('Error saving move:', error);
      throw error;
    }
  }
}
