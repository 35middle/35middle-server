import { Injectable } from '@nestjs/common';
import { Button, ButtonDocument } from './buttons.schema';
import mongoose, { Model } from 'mongoose';
import { IButton } from './types';
import { CreateButtonDto } from './dto/createButton.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EditButtonDto } from './dto/editButton.dto';

@Injectable()
export class ButtonsRepo {
  constructor(
    @InjectModel(Button.name) private buttonModel: Model<ButtonDocument>,
  ) {}

  async createButton(
    createButtonDto: CreateButtonDto,
    videoId: mongoose.Types.ObjectId,
    session?: mongoose.ClientSession,
  ): Promise<IButton> {
    const button = new this.buttonModel({
      ...createButtonDto,
      videoId,
    });

    return button.save({ session });
  }

  async editButton(
    editButtonDto: EditButtonDto,
    buttonId: mongoose.Types.ObjectId,
    session?: mongoose.ClientSession,
  ): Promise<IButton> {
    const button = await this.buttonModel.findById(buttonId);
    Object.assign(button, editButtonDto);

    return button.save({ session });
  }

  async findById(id: string): Promise<IButton> {
    return this.buttonModel.findById(id).lean();
  }
}
