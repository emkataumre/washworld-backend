import { Car } from 'src/cars/entities/car.entity';
import { Location } from 'src/locations/entities/location.entity';
import { Membership } from 'src/memberships/entities/membership.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  first_name: string;
  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  birthday: Date;

  @Column()
  closing_time: string;

  @OneToOne(() => Membership, (membership) => membership.user)
  membership: Membership;

  @ManyToMany(() => Location, (location) => location.users)
  @JoinTable()
  locations: Location[];

  @OneToOne(() => Car, (car) => car.user)
  car: Car;

  //   @ManyToMany(() => Membership, (membership) => membership.users)
  //   @JoinTable()
  //   memberships: Membership[];
}
