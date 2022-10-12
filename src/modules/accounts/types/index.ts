import mongoose from 'mongoose';

export interface IAccount {
  _id: mongoose.Types.ObjectId;
  companyName: string;
  companyMobile: string;
  companyEmail: string;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
