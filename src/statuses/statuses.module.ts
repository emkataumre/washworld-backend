import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { HallsModule } from 'src/halls/halls.module';
import { Hall } from 'src/halls/entities/hall.entity';

@Module({
  controllers: [StatusesController],
  providers: [StatusesService],
  imports: [TypeOrmModule.forFeature([Status, Hall]), HallsModule],
})
export class StatusesModule {}
