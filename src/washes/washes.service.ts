import { Injectable } from '@nestjs/common';
import { CreateWashDto } from './dto/create-wash.dto';
import { UpdateWashDto } from './dto/update-wash.dto';

@Injectable()
export class WashesService {
  create(createWashDto: CreateWashDto) {
    return 'This action adds a new wash';
  }

  findAll() {
    return `This action returns all washes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wash`;
  }

  update(id: number, updateWashDto: UpdateWashDto) {
    return `This action updates a #${id} wash`;
  }

  remove(id: number) {
    return `This action removes a #${id} wash`;
  }
}
