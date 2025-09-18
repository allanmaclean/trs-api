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

  async getPosition(): Promise<Moves> {
    const lastMove = await this.movesRepository.find({
      order: { id: 'DESC' },
      take: 1,
    });
    console.log('Last move from DB:', lastMove);
    return lastMove[0] || { id: 0, move: '0,0,NORTH' };
  }

  async updatePosition(x: number, y: number, direction: Direction): Promise<Moves> {
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
