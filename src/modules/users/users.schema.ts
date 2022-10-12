import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User &
  Document & { updatedAt: Date; createdAt: Date };

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  accountId: mongoose.Types.ObjectId;

  @Prop()
  archivedAt: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
