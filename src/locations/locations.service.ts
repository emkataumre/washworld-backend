import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
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

  async findOne(
    options: FindOneOptions<Location>,
  ): Promise<Location | undefined> {
    const location: Location = await this.locationsRepository.findOne(options);
    return location;
  }
}
