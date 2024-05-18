import { Hall } from 'src/halls/entities/hall.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  status_id: number;

  @Column()
  status: string;

  @ManyToOne(() => Hall, (hall: Hall) => hall.statuses)
  hall: Hall;
}
