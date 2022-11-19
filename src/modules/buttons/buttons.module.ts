import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Button, ButtonSchema } from './buttons.schema';
import { ButtonsController } from './buttons.controller';
import { ButtonsService } from './buttons.service';
import { ButtonsRepo } from './buttons.repo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Button.name, schema: ButtonSchema }]),
  ],
  controllers: [ButtonsController],
  providers: [ButtonsService, ButtonsRepo],
  exports: [ButtonsService],
})
export class ButtonsModule {}
