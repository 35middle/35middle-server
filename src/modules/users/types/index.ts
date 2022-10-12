import mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  accountId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
