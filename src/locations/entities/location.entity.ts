import { Hall } from 'src/halls/entities/hall.entity';
import { User } from 'src/users/entities/user.entity';
import { Wash } from 'src/washes/entities/wash.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  location_id: number;

  @Column()
  address: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  longitude: number;

  @Column()
  opening_times: string;

  @Column()
  closing_times: string;

  @OneToMany(() => Hall, (hall: Hall) => hall.location)
  halls: Hall[];

  @ManyToMany(() => User, (user) => user.locations)
  users: User[];

  @OneToMany(() => Wash, (wash: Wash) => wash.location)
  washes: Wash[];
}
