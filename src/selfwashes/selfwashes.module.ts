import { Module } from '@nestjs/common';
import { SelfwashesService } from './selfwashes.service';
import { SelfwashesController } from './selfwashes.controller';
import { Selfwash } from './entities/selfwash.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SelfwashesController],
  providers: [SelfwashesService],
  imports: [TypeOrmModule.forFeature([Selfwash])],
})
export class SelfwashesModule {}
