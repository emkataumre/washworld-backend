import { Controller, Get, Param } from '@nestjs/common';
import { HallsService } from './halls.service';

@Controller('halls')
export class HallsController {
  constructor(private readonly hallsService: HallsService) {}

  @Get(':location_id')
  findAll(@Param('location_id') location_id: number) {
    return this.hallsService.findAllForLocation(location_id);
  }

  @Get(':location_id/:hall_id')
  findOne(
    @Param('location_id') location_id: number,
    @Param('hall_id') hall_id: number,
  ) {
    return this.hallsService.findOneForLocation(location_id, hall_id);
  }
}
