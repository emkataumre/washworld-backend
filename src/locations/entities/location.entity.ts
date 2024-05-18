import { Hall } from 'src/halls/entities/hall.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  location_id: number;

  @Column()
  address: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  opening_time: string;

  @Column()
  closing_time: string;

  @OneToMany(() => Hall, (hall: Hall) => hall.location)
  halls: Hall[];
}
