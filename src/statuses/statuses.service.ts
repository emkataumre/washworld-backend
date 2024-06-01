import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { HallsService } from 'src/halls/halls.service';
import { Hall } from 'src/halls/entities/hall.entity';

@Injectable()
export class StatusesService {
  constructor(
    private hallsService: HallsService,
    @InjectRepository(Hall) private hallsRepo: Repository<Hall>,
  ) {}

  async findStatusByHallId(hall_id: number): Promise<Status> {
    const hall = await this.hallsService.findOne(hall_id);
    return hall.status;
  }

  async findAllStatusesWithHalls(): Promise<Status[]> {
    const halls = await this.hallsService.findAll();
    return halls.map((hall) => hall.status); // Extracts the status from each hall
  }

  async updateStatus(
    hall_id: number,
    newStatus: Partial<Status>, // Partial means all fields are marked as optional (?)
  ): Promise<Status> {
    const hall = await this.hallsService.findOne(hall_id);
    hall.status = { ...hall.status, ...newStatus }; // Merges the existing status with the new status
    await this.hallsRepo.save(hall);
    return hall.status;
  }
}
