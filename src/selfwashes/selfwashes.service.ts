import { Injectable } from '@nestjs/common';
import { CreateSelfwashDto } from './dto/create-selfwash.dto';
import { UpdateSelfwashDto } from './dto/update-selfwash.dto';

@Injectable()
export class SelfwashesService {
  create(createSelfwashDto: CreateSelfwashDto) {
    return 'This action adds a new selfwash';
  }

  findAll() {
    return `This action returns all selfwashes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} selfwash`;
  }

  update(id: number, updateSelfwashDto: UpdateSelfwashDto) {
    return `This action updates a #${id} selfwash`;
  }

  remove(id: number) {
    return `This action removes a #${id} selfwash`;
  }
}
