import { forwardRef, Module } from '@nestjs/common';
import { SelfwashesService } from './selfwashes.service';
import { SelfwashesController } from './selfwashes.controller';
import { Selfwash } from './entities/selfwash.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsModule } from 'src/locations/locations.module';

@Module({
  controllers: [SelfwashesController],
  providers: [SelfwashesService],
  imports: [
    TypeOrmModule.forFeature([Selfwash]),
    forwardRef(() => LocationsModule),
  ],
  exports: [SelfwashesService],
})
export class SelfwashesModule {}
