import mongoose from 'mongoose';

export interface IVideo {
  _id: mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
  videoTitle: string;
  videoDescription: string;
}