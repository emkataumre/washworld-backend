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

  async findOneForMembership(membership_id: number): Promise<Package> {
    const membership = await this.membershipRepository.findOne({
      where: { membership_id },
      relations: ['package'],
    });

    /*
     * Here we are using the membershipRepository (imported in the module through the entity)
     * to find the membership with the specified membership_id.
     */
    return membership.package;
  }
}
