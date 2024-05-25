import { Injectable } from '@nestjs/common';
import { Feature } from './entities/feature.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from 'src/packages/entities/package.entity';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Package)
    private packagesRepository: Repository<Package>,
  ) {}

  async findAllForPackage(package_id: number): Promise<Feature[]> {
    const _package = await this.packagesRepository.findOne({
      where: { package_id },
      relations: ['features'],
    });

    return _package.features;
  }

  async findOneForPackge(package_id: number, feature_id: number) {
    const _package = await this.packagesRepository.findOne({
      where: { package_id },
      relations: ['features'],
    });

    const feature = _package.features.find(
      (feature) => feature.feature_id == feature_id,
    );

    return feature;
  }
}
