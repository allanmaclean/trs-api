import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Moves } from './moves.entity';
import { DataSource, Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

const testConnection = 'testConnection'

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
  const app: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [Moves],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([Moves]),
    ],
    controllers: [AppController],
    providers: [AppService],
  }).compile();

  appController = app.get<AppController>(AppController);
});


  describe('root', () => {
    describe('getPosition', () => {
      it('should return the last known position', async () => {
        const result = { id: 1, move: '0,0,NORTH' };
        jest.spyOn(appController['appService'], 'getPosition').mockResolvedValue(result);
        expect(await appController.getPosition()).toBe(result);
      });
      it('should return default position if no moves exist', async () => {
        const result = { id: 0, move: '0,0,NORTH' };
        jest.spyOn(appController['appService'], 'getPosition').mockResolvedValue(result);
        expect(await appController.getPosition()).toBe(result);
      });
    });
    describe('updatePosition', () => {
      it('should update the position and return confirmation message', async () => {
        const position = { x: 1, y: 2, direction: 'EAST' as const };
        jest.spyOn(appController['appService'], 'updatePosition').mockResolvedValue({ id: 2, move: '1,2,EAST' });
        expect(await appController.updatePosition(position)).toBe('Position updated');
      });
      it('should return default message if position update fails', async () => {
        const position = { x: 1, y: 2, direction: 'EAST' as const };
        jest.spyOn(appController['appService'], 'updatePosition').mockRejectedValue(new Error('Error updating position'));
        await expect(appController.updatePosition(position)).rejects.toThrow('Error updating position');
      });
    });
  });
});
