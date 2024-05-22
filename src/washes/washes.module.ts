import { Module } from '@nestjs/common';
import { WashesService } from './washes.service';
import { WashesController } from './washes.controller';
import { Wash } from './entities/wash.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [WashesController],
  providers: [WashesService],
  imports: [TypeOrmModule.forFeature([Wash])],
})
export class WashesModule {}
