import mongoose from 'mongoose';

export interface IProject {
  _id: mongoose.Types.ObjectId;
  accountId: mongoose.Types.ObjectId;
  name: string;
  brandColor: string;
  logoPath: string;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
