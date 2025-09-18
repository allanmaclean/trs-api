import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Moves } from './moves.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Moves)
    private movesRepository: Repository<Moves>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  updatePosition(x: number, y: number): Promise<Moves> {
    console.log('Position updated:', { x, y });
    const move = this.movesRepository.create({ move: `PLACE ${x},${y}` });
    return this.movesRepository.save(move);
    // return 'Position updated';
  }
}
