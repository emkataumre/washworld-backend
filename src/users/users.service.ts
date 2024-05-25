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
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const allUsers: User[] = await this.usersRepository.find({});
    return allUsers;
  }

  async findOne(user_id: number): Promise<User> {
    const user: User = await this.findUser(user_id);
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async update(user_id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUser(user_id);
    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(user_id: number): Promise<void> {
    const user = await this.findUser(user_id);
    await this.usersRepository.delete(user_id);
    return;
  }

  private async findUser(user_id: number): Promise<User | undefined> {
    const user: User = await this.usersRepository.findOne({
      where: { user_id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
