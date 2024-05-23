import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Location } from '../../locations/entities/location.entity';
import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import { Package } from 'src/packages/entities/package.entity';

@Entity('washes')
export class Wash {
  @PrimaryGeneratedColumn()
  wash_id: number;

  @Column()
  is_membership_wash: boolean;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user: User) => user.washes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Car, (car: Car) => car.washes)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @ManyToOne(() => Location, (location: Location) => location.washes)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @ManyToOne(() => Package, (_package: Package) => _package.washes)
  @JoinColumn({ name: 'package_id' })
  package: Package;
}
