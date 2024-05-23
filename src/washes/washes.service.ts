import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWashDto } from './dto/create-wash.dto';
import { Wash } from './entities/wash.entity';

@Injectable()
export class WashesService {
  constructor(
    @InjectRepository(Wash)
    private readonly washesRepository: Repository<Wash>,
  ) {}

  async create(createWashDto: CreateWashDto) {
    const wash = this.washesRepository.create(createWashDto);
    return await this.washesRepository.save(wash);
  }

  async findAll() {
    const allWashes = await this.washesRepository.find({});
    return allWashes;
  }

  async findOne(wash_id: number) {
    const wash = await this.washesRepository.findOne({ where: { wash_id } });
    if (!wash) {
      throw new Error('Wash not found');
    }
    return wash;
  }
}
