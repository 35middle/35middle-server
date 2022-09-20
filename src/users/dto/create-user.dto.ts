import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  // readonly id: number;
  // readonly email: string;
  // readonly password?: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
