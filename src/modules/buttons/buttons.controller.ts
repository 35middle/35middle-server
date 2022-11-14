import { Body, Controller, Param, Post } from '@nestjs/common';
import { ButtonsService } from './buttons.service';
import { CreateButtonDto } from './dto/createButton.dto';
import { ButtonsEntity } from './buttons.entity';
import mongoose from 'mongoose';

@Controller({ version: '1', path: 'buttons' })
export class ButtonsController {
  constructor(private readonly buttonService: ButtonsService) {}

  @Post(':videoId/newButton')
  async newButton(
    @Body() createButtonDto: CreateButtonDto,
    @Param('videoId') videoId: mongoose.Types.ObjectId,
  ): Promise<ButtonsEntity> {
    const button = this.buttonService.newButton(createButtonDto, videoId);
    return ButtonsEntity.fromObject(button);
  }
}
