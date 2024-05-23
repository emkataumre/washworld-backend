import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SelfwashesService } from './selfwashes.service';
import { CreateSelfwashDto } from './dto/create-selfwash.dto';
import { UpdateSelfwashDto } from './dto/update-selfwash.dto';

@Controller('selfwashes')
export class SelfwashesController {
  constructor(private readonly selfwashesService: SelfwashesService) {}

  @Post()
  create(@Body() createSelfwashDto: CreateSelfwashDto) {
    return this.selfwashesService.create(createSelfwashDto);
  }

  @Get()
  findAll() {
    return this.selfwashesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selfwashesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSelfwashDto: UpdateSelfwashDto) {
    return this.selfwashesService.update(+id, updateSelfwashDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.selfwashesService.remove(+id);
  }
}
