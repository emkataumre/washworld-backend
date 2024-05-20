import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MembershipsModule } from 'src/memberships/memberships.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CarsModule } from 'src/cars/cars.module';
import { LocationsModule } from 'src/locations/locations.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => MembershipsModule),
    forwardRef(() => LocationsModule),
    forwardRef(() => CarsModule),
  ],
})
export class UsersModule {}
