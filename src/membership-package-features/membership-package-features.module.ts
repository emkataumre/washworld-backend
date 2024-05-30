import { Module } from '@nestjs/common';
import { MembershipPackageFeaturesService } from './membership-package-features.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from 'src/features/entities/feature.entity';
import { FeaturesModule } from 'src/features/features.module';
import { Membership } from 'src/memberships/entities/membership.entity';
import { MembershipsModule } from 'src/memberships/memberships.module';
import { Package } from 'src/packages/entities/package.entity';
import { PackagesModule } from 'src/packages/packages.module';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { MembershipPackageFeaturesController } from './membership-package-features.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Membership, Package, Feature]),
    MembershipsModule,
    PackagesModule,
    FeaturesModule,
    UsersModule,
  ],
  controllers: [MembershipPackageFeaturesController],
  providers: [MembershipPackageFeaturesService],
})
export class MembershipPackageFeaturesModule {}
