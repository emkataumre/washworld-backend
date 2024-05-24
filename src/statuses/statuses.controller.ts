import { Controller, Get, Param } from '@nestjs/common';
import { StatusesService } from './statuses.service';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get(':hall_id')
  findStatusByHallId(@Param('hall_id') hall_id: number) {
    return this.statusesService.findStatusByHallId(hall_id);
  }

  @Get()
  findAllStatusesWithHalls() {
    return this.statusesService.findAllStatusesWithHalls();
  }
}
