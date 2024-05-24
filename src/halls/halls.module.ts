import { Module } from '@nestjs/common';
import { HallsService } from './halls.service';
import { HallsController } from './halls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hall } from './entities/hall.entity';
import { LocationsModule } from 'src/locations/locations.module';

@Module({
  controllers: [HallsController],
  providers: [HallsService],
  imports: [TypeOrmModule.forFeature([Hall]), LocationsModule],
  exports: [HallsService],
})
export class HallsModule {}
