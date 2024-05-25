import {
  Column,
  Entity,
  JoinColumn,
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
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @ManyToOne(() => Status, (status: Status) => status.halls)
  @JoinColumn({ name: 'status_id' })
  status: Status;
}
