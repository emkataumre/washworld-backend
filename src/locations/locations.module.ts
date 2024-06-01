import { Module, forwardRef } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { HallsModule } from 'src/halls/halls.module';
import { SelfwashesModule } from 'src/selfwashes/selfwashes.module';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
  imports: [
    TypeOrmModule.forFeature([Location]),
    forwardRef(() => HallsModule),
    forwardRef(() => SelfwashesModule), // forwardRef to avoid circular dependency
  ],
  exports: [LocationsService],
})
export class LocationsModule {}
