// import { IsEmail, IsNotEmpty } from 'class-validator';
// import { User } from '../interfaces/user.interface'

export class CreateUserDto {
  id: number;
  email: string;
  password?: string;

  // @IsEmail()
  // email: string;

  // @IsNotEmpty()
  // password: string;
}
