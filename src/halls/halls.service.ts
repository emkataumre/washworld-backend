import { Injectable } from '@nestjs/common';
import { CreateHallDto } from './dto/create-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hall } from './entities/hall.entity';

@Injectable()
export class HallsService {
  constructor(
    @InjectRepository(Hall)
    private hallsRepository: Repository<Hall>,
  ) {}
  create(createHallDto: CreateHallDto) {
    return 'This action adds a new hall';
  }

  findAll() {
    return `This action returns all halls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hall`;
  }

  update(id: number, updateHallDto: UpdateHallDto) {
    return `This action updates a #${id} hall`;
  }

  remove(id: number) {
    return `This action removes a #${id} hall`;
  }
}
