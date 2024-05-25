import { Car } from 'src/cars/entities/car.entity';
import { Package } from 'src/packages/entities/package.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToMany,
} from 'typeorm';

@Entity('memberships')
export class Membership {
  @PrimaryGeneratedColumn()
  membership_id: number;

  @Column()
  membership_name: string;

  @Column('decimal', { precision: 5, scale: 2 })
  membership_price: number;

  @ManyToMany(() => User, (user) => user.memberships)
  users: User[];

  @OneToOne(() => Car, (car) => car.membership)
  car: Car;

  @OneToOne(() => Package, (_package) => _package.membership)
  @JoinColumn({ name: 'package_id' })
  package: Package;
}
