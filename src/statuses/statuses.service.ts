import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusesService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}
  create(createStatusDto: CreateStatusDto) {
    return 'This action adds a new status';
  }

  findAll() {
    return `This action returns all statuses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} status`;
  }

  update(id: number, updateStatusDto: UpdateStatusDto) {
    return `This action updates a #${id} status`;
  }

  remove(id: number) {
    return `This action removes a #${id} status`;
  }
}
