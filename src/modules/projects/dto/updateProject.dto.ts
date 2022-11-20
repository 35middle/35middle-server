import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './createProject.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
