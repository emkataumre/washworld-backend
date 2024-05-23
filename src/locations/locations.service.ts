import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    const allLocations: Location[] = await this.locationsRepository.find({});
    return allLocations;
  }

  async findOne(location_id: number): Promise<Location | undefined> {
    const loctation: Location = await this.locationsRepository.findOne({
      where: { location_id },
    });

    return loctation;
  }
}
