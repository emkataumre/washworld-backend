import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';
import { Role } from 'src/roles/role.enum';
import { Membership } from 'src/memberships/entities/membership.entity';

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

  @IsOptional()
  memberships?: Membership[];

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    birthday: Date,
    roles: Role[],
    memberships?: Membership[],
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.birthday = birthday;
    this.roles = roles;
    this.memberships = memberships;
  }
}
