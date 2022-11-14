import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Button, ButtonSchema } from './buttons.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Button.name, schema: ButtonSchema }]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ButtonsModule {}
