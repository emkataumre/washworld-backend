import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hall } from './entities/hall.entity';
import { LocationsService } from 'src/locations/locations.service';

@Injectable()
export class HallsService {
  constructor(
    @InjectRepository(Hall)
    private hallsRepository: Repository<Hall>,
    private locationsService: LocationsService,
  ) {}

  async findAll() {
    const allHalls = await this.hallsRepository.find({});
    return allHalls;
  }

  async findOne(hall_id: number) {
    const hall = await this.hallsRepository.findOne({
      where: { hall_id: hall_id },
    });
    return hall;
  }

  async findAllForLocation(location_id: number): Promise<Hall[]> {
    const location = await this.locationsService.findOne(location_id);
    const allHalls = location.halls;
    return allHalls;
  }

  async findOneForLocation(
    location_id: number,
    hall_id: number,
  ): Promise<Hall> {
    const location = await this.locationsService.findOne(location_id);
    const hall = location.halls.find((hall) => hall.hall_id === hall_id);
    return hall;
  }
}
