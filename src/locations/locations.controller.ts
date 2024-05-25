import { Controller, Get, Param } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':location_id')
  findOne(@Param('location_id') location_id: number) {
    return this.locationsService.findOne({
      where: { location_id },
    });
  }
}
