import { Controller, Get, Param } from '@nestjs/common';
import { PackagesService } from './packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get(':membership_id/:package_id')
  findOne(@Param('membership_id') membership_id: number) {
    return this.packagesService.findOneForMembership(membership_id);
  }
}
