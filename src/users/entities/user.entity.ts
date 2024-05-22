import { Car } from 'src/cars/entities/car.entity';
import { Location } from 'src/locations/entities/location.entity';
import { Membership } from 'src/memberships/entities/membership.entity';
import { Wash } from 'src/washes/entities/wash.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity('users')
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
  @JoinTable({ name: 'users_locations' })
  locations: Location[];

  @OneToOne(() => Car, (car) => car.user)
  car: Car;

  @OneToMany(() => Wash, (wash) => wash.user)
  washes: Wash[];

  //   @ManyToMany(() => Membership, (membership) => membership.users)
  //   @JoinTable()
  //   memberships: Membership[];
}
