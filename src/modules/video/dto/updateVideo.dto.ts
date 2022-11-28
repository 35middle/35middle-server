import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EditVideoDto {
  @IsString()
  @IsNotEmpty()
  videoId: string;

  @IsString()
  @IsNotEmpty()
  videoTitle: string;

  @IsNumber()
  @IsNotEmpty()
  videoDescription: string;
}
