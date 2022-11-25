import mongoose from 'mongoose';

export interface IVideo {
  _id: mongoose.Types.ObjectId;
  videoTitle: string;
  videoDescription: string;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}