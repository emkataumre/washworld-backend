import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/signIn.dto';
import { Role } from 'src/roles/role.enum';
import { MembershipsService } from 'src/memberships/memberships.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private membershipsService: MembershipsService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const { first_name, last_name, email, password, birthday } = createUserDto;
    const lowercaseEmail = email.toLowerCase();

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
          email: lowercaseEmail,
          password: hashedPassword,
          birthday,
          roles: [Role.User],
          memberships: null,
        });

        const membership = await this.membershipsService.findAllForUser(
          newUser.user_id,
        );
        const { password: userPassword, ...userWithoutPassword } = newUser;
        const userWithMembership = { ...userWithoutPassword, membership };

        const payload = { sub: newUser.user_id, user: userWithMembership };
        return {
          access_token: await this.jwtService.sign(payload),
          user: userWithMembership,
        };
      } else {
        throw error;
      }
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmail(email.toLowerCase());
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      if (!isPasswordMatching) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while validating the user',
      );
    }
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const { email, password } = signInDto;
    const user = await this.usersService.findOneByEmail(
      email.toLocaleLowerCase(),
    );
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    const membership = await this.membershipsService.findAllForUser(
      user.user_id,
    );

    const { password: userPassword, ...userWithoutPassword } = user;
    const userWithMembership = { ...userWithoutPassword, membership };

    const payload = { sub: user.user_id, user: userWithMembership };
    return {
      access_token: await this.jwtService.sign(payload),
      user: userWithMembership,
    };
  }
}
