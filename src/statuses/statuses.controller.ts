import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { Status } from './entities/status.entity';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get(':hall_id')
  findStatusByHallId(@Param('hall_id') hall_id: number) {
    return this.statusesService.findStatusByHallId(hall_id);
  }

  @Get()
  findAll() {
    return this.statusesService.findAll();
  }

  @Get()
  findAllStatusesWithHalls() {
    return this.statusesService.findAllStatusesWithHalls();
  }

  @Put(':hall_id')
  updateStatus(
    @Param('hall_id') hall_id: number,
    @Body() newStatus: Partial<Status>,
  ) {
    return this.statusesService.updateStatus(hall_id, newStatus);
  }
}
