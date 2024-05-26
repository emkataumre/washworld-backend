import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/signIn.dto';
import { Role } from 'src/roles/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { first_name, last_name, email, password, birthday } = createUserDto;

    try {
      const existingUser = await this.usersService.findOneByEmail(email);
      if (existingUser) {
        throw new ConflictException('A user with this email already exists');
      }
    } catch (error) {
      if (error.message === 'User not found') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.usersService.create({
          first_name,
          last_name,
          email,
          password: hashedPassword,
          birthday,
          roles: [Role.User],
        });
        return newUser;
      } else {
        console.log(error);
        throw error;
      }
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      console.log(email, pass, 'validateUser');
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      if (!isPasswordMatching) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const { password, ...result } = user;
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while validating the user',
      );
    }
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const { email, password } = signInDto;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    const { password: userPassword, ...userWithoutPassword } = user;
    const payload = { sub: user.user_id, user: userWithoutPassword };
    return {
      access_token: await this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }
}
