import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account &
  Document & { updatedAt: Date; createdAt: Date };

@Schema({ timestamps: true })
export class Account {
  @Prop()
  companyName: string;

  @Prop()
  companyEmail: string;

  @Prop()
  companyMobile: string;

  @Prop()
  archivedAt: Date | null;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
