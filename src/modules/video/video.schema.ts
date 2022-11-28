import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type VideoDocument = Video &
  Document & { updatedAt: Date; createdAt: Date };

@Schema()
export class Video {
  @Prop()
  name: string;

  @Prop()
  thumbnail: string;

  @Prop()
  videoUrl: string;

  @Prop()
  projectId: mongoose.Types.ObjectId;

  @Prop()
  archivedAt: Date | null;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
