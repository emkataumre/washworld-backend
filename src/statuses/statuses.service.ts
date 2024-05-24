import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { HallsService } from 'src/halls/halls.service';

@Injectable()
export class StatusesService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    private hallsService: HallsService,
  ) {}

  async findStatusByHallId(hall_id: number): Promise<Status> {
    const hall = await this.hallsService.findOne(hall_id);
    return hall.status;
  }

  async findAllStatusesWithHalls(): Promise<Status[]> {
    const halls = await this.hallsService.findAll();
    return halls.map((hall) => hall.status);
  }
}
