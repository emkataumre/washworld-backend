import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Role } from 'src/roles/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  birthday: Date;

  @IsArray()
  @ArrayNotEmpty()
  roles: Role[];

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    birthday: Date,
    roles: Role[],
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.birthday = birthday;
    this.roles = roles;
  }
}
