import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountUserDocument = AccountUser & Document;

@Schema()
export class AccountUser {
  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  imageUrl: string;

  @Prop()
  emailVerified: boolean;
}

export const AccountUserSchema = SchemaFactory.createForClass(AccountUser);
