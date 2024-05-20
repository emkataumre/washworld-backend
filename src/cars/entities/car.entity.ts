import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  car_id: number;

  @Column()
  license_plate: string;

  @OneToOne(() => User, (user) => user.car)
  @JoinColumn()
  user: User;
}
