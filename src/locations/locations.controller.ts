import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
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
