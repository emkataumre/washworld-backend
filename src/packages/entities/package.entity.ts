import { Feature } from 'src/features/entities/feature.entity';
import { Membership } from 'src/memberships/entities/membership.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn()
  package_id: number;

  @Column()
  package_name: string;

  @Column('decimal', { precision: 5, scale: 2 })
  package_price: number;

  @OneToOne(() => Membership, (membership) => membership.package)
  @JoinColumn()
  membership: Membership;

  @ManyToMany(() => Feature, (feature) => feature.packages)
  @JoinTable({ name: 'package_features' })
  features: Feature[];
}
