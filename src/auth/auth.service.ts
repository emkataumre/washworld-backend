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
      // Checking if the user already exists in the dataase.
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
        // If the user does not exist, create a new user.

        const membership = await this.membershipsService.findAllForUser(
          newUser.user_id,
        );
        const userWithoutPassword = { ...newUser };
        delete userWithoutPassword.password;
        const userWithMembership = { ...userWithoutPassword, membership };

        // Create a user object without the password and add the membership to it. This is the object that will be returned to the client.
        // The membership is added to the user object so that the client can have access to the user's membership details in the PackageScreen.

        const payload = { sub: newUser.user_id, user: userWithMembership };
        return {
          access_token: await this.jwtService.sign(payload),
          user: userWithMembership,
        };

        // Sign the user in and return the access token and the user object to the client.
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

      // Check if the password matches the one stored in the database.
      const result = { ...user };
      delete result.password;
      return result;

      // If the password matches, return the user object without the password.
      // Here we use the delete operator to remove the password from the user object before returning it.
      // This done differently in the signUp method, to show that there are multiple ways to achieve the same result.
      // The difference is that delete modifies the original object, while the spread operator creates a new object.
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while validating the user',
      );
    }
  } // This method is used by the LocalStrategy to validate the user's credentials.

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

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    const userWithMembership = { ...userWithoutPassword, membership };

    const payload = { sub: user.user_id, user: userWithMembership };
    return {
      access_token: await this.jwtService.sign(payload),
      user: userWithMembership,
    };
  }
}
