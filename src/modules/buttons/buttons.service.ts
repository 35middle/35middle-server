import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateButtonDto } from './dto/createButton.dto';
import { IButton } from './types';
import { ButtonsRepo } from './buttons.repo';
import { EditButtonDto } from './dto/editButton.dto';

@Injectable()
export class ButtonsService {
  private readonly logger = new Logger(ButtonsService.name);

  constructor(
    private readonly buttonsRepo: ButtonsRepo,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async newButton(
    createButtonDto: CreateButtonDto,
    videoId: mongoose.Types.ObjectId,
  ): Promise<IButton> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const newButton = await this.buttonsRepo.createButton(
        createButtonDto,
        videoId,
        session,
      );
      await session.commitTransaction();
      return newButton;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }

  async editButton(editButtonDto: EditButtonDto): Promise<IButton> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const updatedButton = await this.buttonsRepo.editButton(
        editButtonDto,
        'buttonId',
        session,
      );
      await session.commitTransaction();
      return updatedButton;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
