import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProjectDocument = Project &
  Document & { updatedAt: Date; createdAt: Date };

@Schema({ timestamps: true })
export class Project {
  @Prop()
  name: string;

  @Prop()
  brandColor: string;

  @Prop()
  logoPath: string;

  @Prop()
  accountId: mongoose.Types.ObjectId;

  @Prop()
  archivedAt: Date | null;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
