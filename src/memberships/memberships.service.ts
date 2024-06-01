import { Injectable } from '@nestjs/common';
import { Membership } from './entities/membership.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private membershipsRepository: Repository<Membership>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Membership[]> {
    const memberships = await this.membershipsRepository.find();
    return memberships;
  }

  async findAllForUser(user_id: number): Promise<Membership[]> {
    const user = await this.usersRepository.findOne({
      where: { user_id },
      relations: ['memberships'],
    });

    const memberships = user.memberships.map((membership) => ({
      ...membership,
      membership_price: Number(membership.membership_price),
    }));

    return memberships;
  }

  async findOneForUser(
    user_id: number,
    membership_id: number,
  ): Promise<Membership> {
    const user = await this.usersRepository.findOne({
      where: { user_id },
      relations: ['memberships'],
    });

    let membership = user.memberships.find(
      (membership) => membership.membership_id == membership_id,
    ); // Finds the membership with the specified membership_id

    if (membership) {
      membership = {
        ...membership,
        membership_price: Number(membership.membership_price),
      }; // Converts the membership_price to a number
    }

    return membership;
  }
}
