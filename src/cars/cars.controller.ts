import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  findAll(user_id: number) {
    return this.carsService.findAll(user_id);
  }

  @Get(':car_id/:user_id')
  async findOne(
    @Param('car_id') car_id: number,
    @Param('user_id') user_id: number,
  ) {
    return this.carsService.findOne(car_id, user_id);
  }

  @Put(':car_id')
  update(
    @Param('car_id') car_id: number,
    @Body('user_id') user_id: number,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(user_id, car_id, updateCarDto);
  }

  @Delete(':car_id/:user_id')
  async remove(
    @Param('car_id') car_id: number,
    @Param('user_id') user_id: number,
  ) {
    return this.carsService.remove(car_id, user_id);
  }
}
