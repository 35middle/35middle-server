import { IsString, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateAccountUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsBoolean()
  emailVerified: boolean;
}
