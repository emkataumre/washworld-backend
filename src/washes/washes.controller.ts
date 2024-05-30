import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WashesService } from './washes.service';
import { CreateWashDto } from './dto/create-wash.dto';

@Controller('washes')
export class WashesController {
  constructor(private readonly washesService: WashesService) {}

  @Post()
  create(@Body() createWashDto: CreateWashDto) {
    return this.washesService.create(createWashDto);
  }

  @Get()
  findAll() {
    return this.washesService.findAll();
  }

  @Get(':wash_id')
  findOne(@Param('id') wash_id: number) {
    return this.washesService.findOne(wash_id);
  }
}
