import { Car } from 'src/cars/entities/car.entity';
import { Location } from 'src/locations/entities/location.entity';
import { Membership } from 'src/memberships/entities/membership.entity';
import { Role } from 'src/roles/role.enum';
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
  password: string;

  @Column()
  birthday: Date;

  @Column('enum', { enum: Role, array: true })
  roles: Role[];

  @Column({ default: false })
  newsletter_opt_in: boolean; // This defines a default value for the newsletter_opt_in column.

  @Column({ type: 'text', nullable: true })
  damage_report: string[]; // Column for storing base64 encoded image data

  @ManyToMany(() => Location, (location) => location.users)
  @JoinTable({
    name: 'users_locations',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id',
    },
    inverseJoinColumn: {
      name: 'location_id',
      referencedColumnName: 'location_id',
    },
  })
  locations: Location[];

  @OneToOne(() => Car, (car) => car.user)
  car: Car;

  @ManyToMany(() => Membership, (membership) => membership.users)
  @JoinTable({
    name: 'users_memberships',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id',
    },
    inverseJoinColumn: {
      name: 'membership_id',
      referencedColumnName: 'membership_id',
    },
  })
  memberships: Membership[];

  @OneToMany(() => Wash, (wash: Wash) => wash.user)
  washes: Wash[];
}
