import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wash } from './entities/wash.entity';
import { UsersModule } from 'src/users/users.module';
import { CarsModule } from 'src/cars/cars.module';
import { LocationsModule } from 'src/locations/locations.module';
import { PackagesModule } from 'src/packages/packages.module';
import { WashesController } from './washes.controller';
import { WashesService } from './washes.service';

@Module({
  controllers: [WashesController],
  providers: [WashesService],
  imports: [
    TypeOrmModule.forFeature([Wash]),
    forwardRef(() => UsersModule),
    forwardRef(() => CarsModule),
    forwardRef(() => LocationsModule),
    forwardRef(() => PackagesModule),
  ],
})
export class WashesModule {}
