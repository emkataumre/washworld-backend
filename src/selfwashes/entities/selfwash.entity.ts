import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';
import { Status } from 'src/statuses/entities/status.entity';

@Entity()
export class Selfwash {
  @PrimaryGeneratedColumn()
  selfwash_id: number;

  @ManyToOne(() => Location, (location: Location) => location.selfwashes)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @ManyToOne(() => Status, (status: Status) => status.selfwashes)
  @JoinColumn({ name: 'status_id' })
  status: Status;
}
