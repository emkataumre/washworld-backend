import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from '../../locations/entities/location.entity';
import { Status } from 'src/statuses/entities/status.entity';

@Entity('halls')
export class Hall {
  @PrimaryGeneratedColumn()
  hall_id: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  max_rim_size: number;

  @ManyToOne(() => Location, (location: Location) => location.halls)
  location: Location;

  @OneToMany(() => Status, (status: Status) => status.hall)
  statuses: Status[];
}
