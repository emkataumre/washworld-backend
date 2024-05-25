import { Controller, Get, Param } from '@nestjs/common';
import { SelfwashesService } from './selfwashes.service';

@Controller('selfwashes')
export class SelfwashesController {
  constructor(private readonly selfwashesService: SelfwashesService) {}

  @Get(':location_id')
  findAllForLocation(@Param('location_id') location_id: number) {
    return this.selfwashesService.findAllForLocation(location_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selfwashesService.findOne(+id);
  }
}
