import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  archivedAt: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
