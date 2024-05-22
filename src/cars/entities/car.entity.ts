import { User } from 'src/users/entities/user.entity';
import { Wash } from 'src/washes/entities/wash.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  car_id: number;

  @Column()
  license_plate: string;

  @OneToMany(() => Wash, (wash) => wash.car)
  washes: Wash[];

  @OneToOne(() => User, (user) => user.car)
  @JoinColumn()
  user: User;
}
