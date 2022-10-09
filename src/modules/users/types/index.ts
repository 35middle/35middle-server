import mongoose from 'mongoose';

export interface CreatedUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
