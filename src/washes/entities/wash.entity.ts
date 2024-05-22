import { Car } from 'src/cars/entities/car.entity';
import { Location } from 'src/locations/entities/location.entity';
import { WashPackage } from 'src/packages/entities/package.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('washes')
export class Wash {
  @PrimaryGeneratedColumn()
  wash_id: number;

  @Column()
  is_membership_wash: boolean;

  @Column()
  date: Date;

  @ManyToOne(() => Location, (location) => location.washes)
  location: Location;

  @ManyToOne(() => User, (user) => user.washes)
  user: User;

  @ManyToOne(() => Car, (car) => car.washes)
  car: Car;

  @ManyToOne(() => WashPackage, (wash_package) => wash_package.washes)
  package: WashPackage;
}
