import { Module, forwardRef } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [TypeOrmModule.forFeature([Car]), forwardRef(() => UsersModule)],
})
export class CarsModule {}
