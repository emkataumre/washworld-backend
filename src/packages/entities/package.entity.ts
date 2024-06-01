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
      /*
       * The inverseJoinColumn is used in a many-to-many relationship to specify the column name of the other side of the relationship.
       * Here, inverseJoinColumn is used to specify that the 'feature_id' column in the 'package_features' join table is used to reference the Feature entities.
       */
      name: 'feature_id',
      referencedColumnName: 'feature_id',
    },
  })
  features: Feature[];

  @OneToMany(() => Wash, (wash: Wash) => wash.package)
  washes: Wash[];
}
