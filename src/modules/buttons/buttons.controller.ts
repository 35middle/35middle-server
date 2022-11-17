import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ButtonsService } from './buttons.service';
import { ButtonsEntity } from './buttons.entity';
import mongoose from 'mongoose';
import { EditButtonDto } from './dto/editButton.dto';

@Controller({ version: '1', path: 'newButton' })
export class ButtonsController {
  constructor(private readonly buttonService: ButtonsService) {}

  // @Post('/:videoId')
  // async newButton(
  //   @Body() createButtonDto: CreateButtonDto,
  //   @Param('videoId') videoId: mongoose.Types.ObjectId,
  // ): Promise<ButtonsEntity> {
  //   const button = this.buttonService.newButton(createButtonDto, videoId);
  //   return ButtonsEntity.fromObject(button);
  // }

  @Get('/:buttonId')
  async showButton(
    @Param('buttonId') buttonId: mongoose.Types.ObjectId,
  ): Promise<ButtonsEntity> {
    const button = this.buttonService.getButton(buttonId);
    return ButtonsEntity.fromObject(button);
  }

  @Put('/:buttonId')
  async saveButton(
    @Body() editButtonDto: EditButtonDto,
    @Param() buttonId: mongoose.Types.ObjectId,
  ): Promise<ButtonsEntity> {
    const button = this.buttonService.saveButton(editButtonDto, buttonId);
    return ButtonsEntity.fromObject(button);
  }
}
