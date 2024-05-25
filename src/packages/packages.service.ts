import { Injectable } from '@nestjs/common';
import { Package } from './entities/package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from 'src/memberships/entities/membership.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,
  ) {}

  async findOneForMembership(
    membership_id: number,
    package_id,
  ): Promise<Package> {
    const membership = await this.membershipRepository.findOne({
      where: { membership_id },
      relations: ['package'],
    });

    return membership.package;
  }
}
