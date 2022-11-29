import mongoose from 'mongoose';

export interface IVideo {
  _id: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  name: string;
  thumbnail: string;
  videoUrl: string;
  preview: string;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
