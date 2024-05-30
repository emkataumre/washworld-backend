import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post(':userId/damageReport')
  async addDamageReport(
    @Param('userId', ParseIntPipe) userId: number,
    @Body('damageReport') damageReport: string,
  ) {
    return this.usersService.saveDamageReport(userId, damageReport);
  }

  @Post(':user_id/:location_id')
  addFavoriteLocation(
    @Param('user_id') user_id: number,
    @Param('location_id') location_id: number,
  ) {
    return this.usersService.addFavoriteLocation(user_id, location_id);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':user_id')
  findOne(@Param('user_id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(':user_id/favorite_locations')
  findAllFavoriteLocations(@Param('user_id') user_id: number) {
    return this.usersService.findAllFavoriteLocations(user_id);
  }

  @Put(':user_id')
  update(@Param('user_id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':user_id')
  remove(@Param('user_id') id: string) {
    return this.usersService.remove(+id);
  }

  @Delete(':user_id/:location_id')
  removeFavoriteLocation(
    @Param('user_id') user_id: number,
    @Param('location_id') location_id: number,
  ) {
    return this.usersService.removeFavoriteLocation(user_id, location_id);
  }
}
