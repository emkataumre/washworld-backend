import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Selfwash } from './entities/selfwash.entity';
import { LocationsService } from 'src/locations/locations.service';

@Injectable()
export class SelfwashesService {
  constructor(
    @InjectRepository(Selfwash)
    private selfwashesRepository: Repository<Selfwash>,
    private locationsService: LocationsService,
  ) {}

  async findAllForLocation(location_id: number): Promise<any> {
    const location = await this.locationsService.findOne({
      where: { location_id },
      relations: ['selfwashes'],
    });

    const selfwashesWithStatus = await Promise.all(
      location.selfwashes.map(async (selfwash) => {
        const status = await this.findOne(selfwash.selfwash_id);
        return { ...selfwash, status_id: status.status.status_id };
      }),
    );

    return selfwashesWithStatus;
  }

  findAll() {
    return `This action returns all selfwashes`;
  }

  async findOne(selfwash_id: number): Promise<Selfwash> {
    return this.selfwashesRepository.findOne({
      where: { selfwash_id },
      relations: ['status'],
    });
  }
}
