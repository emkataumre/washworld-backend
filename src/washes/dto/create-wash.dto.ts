import { IsNotEmpty } from 'class-validator';

export class CreateWashDto {
  @IsNotEmpty()
  isMembershipWash: boolean;
  @IsNotEmpty()
  date: Date;
}
