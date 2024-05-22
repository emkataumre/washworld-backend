import { Membership } from 'src/memberships/entities/membership.entity';
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

  @OneToOne(() => User, (user) => user.car)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Membership, (membership) => membership.car)
  membership: Membership;

  @OneToMany(() => Wash, (wash: Wash) => wash.car)
  washes: Wash[];
}
