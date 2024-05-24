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

  async findAll(): Promise<Hall[]> {
    return this.hallsRepository.find({ relations: ['status'] });
  }

  async findOne(hall_id: number): Promise<Hall> {
    return this.hallsRepository.findOne({
      where: { hall_id },
      relations: ['status'],
    });
  }

  async findAllForLocation(location_id: number): Promise<Hall[]> {
    const location = await this.locationsService.findOne({
      where: { location_id },
      relations: ['halls'], //used to load relations outside of the location table, by default relations are not loaded for better performance
    });
    return location.halls;
  }

  async findOneForLocation(
    location_id: number,
    hall_id: number,
  ): Promise<Hall> {
    const location = await this.locationsService.findOne({
      where: { location_id },
      relations: ['halls'], //used to load relations outside of the location table, by default relations are not loaded for better performance
    });
    const hall = location.halls.find((hall) => hall.hall_id === hall_id);
    return hall;
  }
}
