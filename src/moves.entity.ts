import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Moves {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  move: string;
}