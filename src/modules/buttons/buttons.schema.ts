import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ButtonDocument = Button & Document;

@Schema()
export class Button {
  @Prop()
  buttonId: mongoose.Types.ObjectId;

  @Prop()
  videoId: mongoose.Types.ObjectId;

  @Prop()
  buttonNickname: string;

  @Prop()
  buttonText: string;

  @Prop()
  buttonPositionVertical: number;

  @Prop()
  buttonPositionHorizontal: number;

  @Prop()
  buttonStyle: string;

  @Prop()
  buttonSize: string;

  @Prop()
  buttonLink: string | null;

  @Prop()
  buttonJump: number | null;

  @Prop()
  buttonStart: number;

  @Prop()
  buttonEnd: number;
}

export const ButtonSchema = SchemaFactory.createForClass(Button);
