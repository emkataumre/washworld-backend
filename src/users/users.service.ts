import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LocationsService } from 'src/locations/locations.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private locationsService: LocationsService,
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

  async addFavoriteLocation(
    user_id: number,
    location_id: number,
  ): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { user_id },
      relations: ['locations'],
    });
    const location = await this.locationsService.findOneLocation(location_id);

    if (user && location) {
      user.locations.push(location);
      await this.usersRepository.save(user);
    }
  }

  async findAllFavoriteLocations(user_id: number): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { user_id },
      relations: ['locations'],
    });

    return user.locations;
  }

  async removeFavoriteLocation(
    user_id: number,
    location_id: number,
  ): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { user_id },
      relations: ['locations'],
    });

    if (user) {
      const newFavLocations = user.locations.filter(
        (location) => Number(location.location_id) !== Number(location_id),
      );
      await this.usersRepository.save({
        ...user,
        locations: newFavLocations,
      });
    }
  }

  async saveDamageReport(user_id: number, damageReport: string): Promise<void> {
    const user: User = await this.findUser(user_id);
    if (user.damage_report) {
      user.damage_report.push(damageReport);
    } else {
      user.damage_report = [damageReport];
    }
    await this.usersRepository.save(user);
  }
}
