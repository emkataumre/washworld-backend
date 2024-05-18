import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { HallsModule } from 'src/halls/halls.module';

@Module({
  controllers: [StatusesController],
  providers: [StatusesService],
  imports: [TypeOrmModule.forFeature([Status]), HallsModule],
})
export class StatusesModule {}
