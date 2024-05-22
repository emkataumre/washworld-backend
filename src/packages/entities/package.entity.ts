import { Feature } from 'src/features/entities/feature.entity';
import { Membership } from 'src/memberships/entities/membership.entity';
import { Wash } from 'src/washes/entities/wash.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity('packages')
export class WashPackage {
  @PrimaryGeneratedColumn()
  package_id: number;

  @Column()
  package_name: string;

  @Column('decimal', { precision: 5, scale: 2 })
  package_price: number;

  @OneToMany(() => Wash, (wash) => wash.package)
  washes: Wash[];

  @OneToOne(() => Membership, (membership) => membership.package)
  @JoinColumn()
  membership: Membership;

  @ManyToMany(() => Feature, (feature) => feature.packages)
  @JoinTable({ name: 'package_features' })
  features: Feature[];
}
