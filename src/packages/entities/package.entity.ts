import { Feature } from 'src/features/entities/feature.entity';
import { Membership } from 'src/memberships/entities/membership.entity';
import { Wash } from 'src/washes/entities/wash.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
  ManyToMany,
  OneToMany,
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
  membership: Membership;

  @ManyToMany(() => Feature, (feature) => feature.packages)
  @JoinTable({
    name: 'package_features',
    joinColumn: {
      name: 'package_id',
      referencedColumnName: 'package_id',
    },
    inverseJoinColumn: {
      name: 'feature_id',
      referencedColumnName: 'feature_id',
    },
  })
  features: Feature[];

  @OneToMany(() => Wash, (wash: Wash) => wash.package)
  washes: Wash[];
}
