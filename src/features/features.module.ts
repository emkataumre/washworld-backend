import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { Package } from 'src/packages/entities/package.entity';

@Module({
  controllers: [FeaturesController],
  providers: [FeaturesService],
  imports: [TypeOrmModule.forFeature([Feature, Package])],
  exports: [FeaturesService],
})
export class FeaturesModule {}
