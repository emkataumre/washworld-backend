import { Controller, Get, Param } from '@nestjs/common';
import { MembershipsService } from './memberships.service';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Get()
  findAll() {
    return this.membershipsService.findAll();
  }

  @Get(':user_id')
  findAllForUser(@Param('user_id') user_id: number) {
    return this.membershipsService.findAllForUser(user_id);
  }

  @Get(':user_id/:membership_id')
  findOneForUser(
    @Param('user_id') user_id: number,
    @Param('membership_id') membership_id: number,
  ) {
    return this.membershipsService.findOneForUser(user_id, membership_id);
  }
}
