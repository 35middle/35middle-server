import mongoose from 'mongoose';

export interface IButton {
  _id: mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
  buttonNickname: string;
  buttonText: string;
  buttonPositionVertical: number;
  buttonPositionHorizontal: number;
  buttonStyle: string;
  buttonSize: string;
  buttonLink: string | null;
  buttonJump: number | null;
  buttonStart: number;
  buttonEnd: number;
}
