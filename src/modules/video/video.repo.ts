import { Injectable } from '@nestjs/common';
import { Video, VideoDocument } from './video.schema';
import mongoose, { Model } from 'mongoose';
import { IVideo } from './types/index';
import { CreateVideoDto } from './dto/createVideo.dto';
import { InjectModel } from '@nestjs/mongoose';

import { EditVideoDto } from './dto/editVideo.dto';

@Injectable()
export class VideosRepo {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async createVideo(
    createVideoDto: CreateVideoDto,
    videoId: mongoose.Types.ObjectId,
    session?: mongoose.ClientSession,
  ): Promise<IVideo> {
    const video = new this.videoModel({
      ...createVideoDto,
      videoId,
    });

    return video.save({ session });
  }

  async saveVideo(
    editVideoDto: EditVideoDto,
    videoId: mongoose.Types.ObjectId,
    session?: mongoose.ClientSession,
  ): Promise<IVideo> {
    const video = await this.videoModel.findById(videoId);
    Object.assign(video, editVideoDto);

    return video.save({ session });
  }

  async findById(id: mongoose.Types.ObjectId): Promise<IVideo> {
    return this.videoModel.findById(id).lean();
  }
}