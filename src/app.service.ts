import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Moves } from './moves.entity';
import { Repository } from 'typeorm';
import { Direction } from './app.controller';
import { last } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Moves)
    private movesRepository: Repository<Moves>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async getPosition(): Promise<Moves> {
    const lastMove = await this.movesRepository.find({
      order: { id: 'DESC' },
      take: 1,
    });
    if (lastMove) {
      console.log('Last move retrieved:', lastMove);
      return lastMove[0];
    } else {
      console.log('No moves found, returning default position');
      return { id: 0, move: '0,0,NORTH' }; // Default position if no moves exist
    }
  }

  async updatePosition(x: number, y: number, direction: Direction): Promise<Moves> {
    // console.log('Position updated:', { x, y });
    // const move = this.movesRepository.create({ move: `PLACE ${x},${y}` });
    // return await this.movesRepository.save(move);
    // // return 'Position updated';
    try {
      console.log('Position updated:', { x, y, direction });
      const move = this.movesRepository.create({ move: `${x},${y},${direction}` });
      return await this.movesRepository.save(move);
    } catch (error) {
      console.error('Error saving move:', error);
      throw error;
    }
  }
}
