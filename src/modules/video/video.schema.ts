import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  @Prop()
  videoId: mongoose.Types.ObjectId;

  // @Prop()
  // videoId: mongoose.Types.ObjectId;

  @Prop()
  videoTitle: string;

  @Prop()
  videoDescription: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);