import { WashPackage } from 'src/packages/entities/package.entity';
import {
  ManyToMany,
  JoinTable,
  Column,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn()
  feature_id: number;

  @Column()
  feature_name: string;

  @Column()
  feature_description: string;

  @ManyToMany(() => WashPackage, (wash_package) => wash_package.features)
  packages: WashPackage[];
}
