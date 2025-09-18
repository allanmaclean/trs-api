// Generate spec for the app.service
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { Moves } from './moves.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Direction } from './app.controller';

describe('AppService', () => {
  let appService: AppService;
  let movesRepository: Repository<Moves>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Moves),
          useClass: Repository,
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    movesRepository = module.get<Repository<Moves>>(getRepositoryToken(Moves));
  });

  describe('getPosition', () => {
    it('should return the last known position', async () => {
      const result = { id: 1, move: '0,0,NORTH' };
      jest.spyOn(movesRepository, 'find').mockResolvedValue([result] as Moves[]);
      expect(await appService.getPosition()).toBe(result);
    });

    it('should return default position if no moves exist', async () => {
      const result = { id: 0, move: '0,0,NORTH' };
      jest.spyOn(movesRepository, 'find').mockResolvedValue([] as Moves[]);
      expect(await appService.getPosition()).toEqual(result);
    });
  });
    describe('updatePosition', () => {
    it('should save the new position and return the saved move', async () => {
        const position = { x: 1, y: 2, direction: 'EAST' as Direction };
        const savedMove = { id: 2, move: '1,2,EAST' };
        jest.spyOn(movesRepository, 'create').mockReturnValue(savedMove as Moves);
        jest.spyOn(movesRepository, 'save').mockResolvedValue(savedMove as Moves);
        expect(await appService.updatePosition(position.x, position.y, position.direction)).toBe(savedMove);
      });
      it('should throw an error if saving the move fails', async () => {
        const position = { x: 1, y: 2, direction: 'EAST' as Direction };
        jest.spyOn(movesRepository, 'create').mockReturnValue({ id: 0, move: '1,2,EAST' } as Moves);
        jest.spyOn(movesRepository, 'save').mockRejectedValue(new Error('Error saving move'));
        await expect(appService.updatePosition(position.x, position.y, position.direction)).rejects.toThrow('Error saving move');
      });
    });
});              