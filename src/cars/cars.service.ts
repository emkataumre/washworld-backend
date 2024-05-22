import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private carsRepository: Repository<Car>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    const user = await this.usersRepository.findOne({
      where: { user_id: createCarDto.user_id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const newCar = this.carsRepository.create({
      ...createCarDto,
      user, // link the car to the user
    });

    return this.carsRepository.save(newCar);
  }

  async findAll(user_id: number) {
    const allCars = await this.carsRepository.find({
      where: { user: { user_id: user_id } },
      relations: ['user'], // ensures the user relation is loaded
    });
    return allCars;
  }

  async findOne(car_id: number, user_id: number) {
    const car = await this.carsRepository.findOne({
      where: {
        car_id: car_id,
        user: { user_id: user_id },
      },
      relations: ['user'],
    });

    if (!car) {
      throw new Error('Car not found');
    }

    return car;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  async remove(user_id: number, car_id: number) {
    const car = await this.carsRepository.findOne({
      where: { car_id: car_id, user: { user_id: user_id } },
      relations: ['user'],
    });

    if (!car) {
      throw new Error('Car not found');
    }

    await this.carsRepository.delete(car);
  }
}
