import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { Membership } from 'src/memberships/entities/membership.entity';

@Module({
  controllers: [PackagesController],
  providers: [PackagesService],
  imports: [TypeOrmModule.forFeature([Package, Membership])], // Import the Package and Membership entities
  exports: [PackagesService],
})
export class PackagesModule {}
