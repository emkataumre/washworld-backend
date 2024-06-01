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
    return this.hallsRepository.find({ relations: ['status'] }); // Ensures the 'status' relation is loaded
  }

  async findOne(hall_id: number): Promise<Hall> {
    return this.hallsRepository.findOne({
      where: { hall_id },
      relations: ['status'], // Ensures the 'status' relation is loaded
    });
  }

  async findAllForLocation(location_id: number): Promise<any> {
    const location = await this.locationsService.findOne({
      where: { location_id },
      relations: ['halls'], // Ensures the 'halls' relation is loaded
    });

    // Load the 'status' relation for each 'Hall' entity
    const hallsWithStatus = await Promise.all(
      location.halls.map(async (hall) => {
        const status = await this.findOne(hall.hall_id);
        return { ...hall, status_id: status.status.status_id };
      }), // Adds the 'status_id' property to each 'Hall' entity
    );

    return hallsWithStatus;
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
  } // Finds the hall with the specified hall_id
}
