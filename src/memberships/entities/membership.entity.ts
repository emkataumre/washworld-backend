import { Package } from 'src/packages/entities/package.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  membership_id: number;

  @Column()
  membership_name: string;

  @Column('decimal', { precision: 5, scale: 2 })
  membership_price: number;

  @OneToOne(() => User, (user) => user.membership)
  @JoinColumn()
  user: User;

  @OneToOne(() => Package, (_package) => _package.membership)
  @JoinColumn()
  package: Package;
}
