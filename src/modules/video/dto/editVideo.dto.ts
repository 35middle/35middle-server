import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EditVideoDto {
  @IsString()
  @IsNotEmpty()
  videoNickname: string;

  @IsString()
  @IsNotEmpty()
  videoText: string;

  @IsNumber()
  @IsNotEmpty()
  videoPositionVertical: number;

  @IsNumber()
  @IsNotEmpty()
  videoPositionHorizontal: number;

  @IsString()
  @IsNotEmpty()
  videoStyle: string;

  @IsString()
  @IsNotEmpty()
  videoSize: string;

  @IsNumber()
  @IsNotEmpty()
  videoStart: number;

  @IsNumber()
  @IsNotEmpty()
  videoEnd: number;
}