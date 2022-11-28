import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EditButtonDto {
  @IsString()
  @IsNotEmpty()
  buttonNickname: string;

  @IsString()
  @IsNotEmpty()
  buttonText: string;

  @IsNumber()
  @IsNotEmpty()
  buttonPositionVertical: number;

  @IsNumber()
  @IsNotEmpty()
  buttonPositionHorizontal: number;

  @IsString()
  @IsNotEmpty()
  buttonStyle: string;

  @IsString()
  @IsNotEmpty()
  buttonSize: string;

  @IsNumber()
  @IsNotEmpty()
  buttonStart: number;

  @IsNumber()
  @IsNotEmpty()
  buttonEnd: number;
}
