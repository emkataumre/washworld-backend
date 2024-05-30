import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MembershipsController } from './memberships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [MembershipsController],
  providers: [MembershipsService],
  imports: [TypeOrmModule.forFeature([Membership, User])],
  exports: [MembershipsService],
})
export class MembershipsModule {}
