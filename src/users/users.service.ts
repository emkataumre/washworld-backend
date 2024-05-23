import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll() {
    const allUsers = await this.usersRepository.find({});
    return allUsers;
  }

  async findOne(user_id: number) {
    return this.findUser(user_id);
  }

  async update(user_id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findUser(user_id);
    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(user_id: number) {
    const user = await this.findUser(user_id);
    await this.usersRepository.delete(user);
    return `User ${(user.first_name, user.last_name)} deleted`;
  }

  private async findUser(user_id: number) {
    const user = await this.usersRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
