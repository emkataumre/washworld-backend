import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { SelfwashesService } from './selfwashes.service';
import { UpdateSelfwashDto } from './dto/update-selfwash.dto';

@Controller('selfwashes')
export class SelfwashesController {
  constructor(private readonly selfwashesService: SelfwashesService) {}

  @Get(':location_id')
  findAll(@Param('location_id') location_id: number) {
    return this.selfwashesService.findAllForLocation(location_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selfwashesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSelfwashDto: UpdateSelfwashDto,
  ) {
    return this.selfwashesService.update(+id, updateSelfwashDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.selfwashesService.remove(+id);
  }
}
