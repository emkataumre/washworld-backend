import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
