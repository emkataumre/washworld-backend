import { Injectable } from '@nestjs/common';
import { Membership } from './entities/membership.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private membershipsRepository: Repository<Membership>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAllForUser(user_id: number): Promise<Membership[]> {
    const user = await this.usersRepository.findOne({
      where: { user_id },
      relations: ['memberships'],
    });

    return user.memberships;
  }

  async findOneForUser(
    user_id: number,
    membership_id: number,
  ): Promise<Membership> {
    const user = await this.usersRepository.findOne({
      where: { user_id },
      relations: ['memberships'],
    });

    const membership = user.memberships.find(
      (membership) => membership.membership_id == membership_id,
    );

    return membership;
  }
}
