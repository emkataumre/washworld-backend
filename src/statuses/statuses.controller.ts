import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { Status } from './entities/status.entity';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

  @Put(':hall_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  updateStatus(
    @Param('hall_id') hall_id: number,
    @Body() newStatus: Partial<Status>,
  ) {
    return this.statusesService.updateStatus(hall_id, newStatus);
  }
}
