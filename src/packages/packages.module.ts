import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { Package } from './entities/package.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PackagesController],
  providers: [PackagesService],
  imports: [TypeOrmModule.forFeature([Package])],
})
export class PackagesModule {}
