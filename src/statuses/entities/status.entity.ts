import { Hall } from 'src/halls/entities/hall.entity';
import { Selfwash } from 'src/selfwashes/entities/selfwash.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  status_id: number;

  @Column()
  status: string;

  @OneToMany(() => Hall, (hall: Hall) => hall.status)
  halls: Hall[];

  @OneToMany(() => Selfwash, (selfwash: Selfwash) => selfwash.status)
  selfwashes: Selfwash[];
}
