import { Injectable } from '@nestjs/common';
import { Video, VideoDocument } from './video.schema';
import mongoose, { Model } from 'mongoose';
import { IVideo } from './types';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VideosRepo {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async createVideo({
    name,
    videoUrl,
    preview,
    thumbnail,
    projectId,
  }: {
    name: string;
    projectId: mongoose.Types.ObjectId;
    videoUrl: string;
    thumbnail: string;
    preview: string;
  }): Promise<IVideo> {
    const video = new this.videoModel({
      name,
      videoUrl,
      preview,
      thumbnail,
      projectId,
      archivedAt: null,
    });
    return video.save();
  }

  async updateVideo(
    videoId: mongoose.Types.ObjectId,
    update: Partial<IVideo>,
  ): Promise<IVideo> {
    return this.videoModel.findByIdAndUpdate(videoId, update);
  }

  async findById(id: mongoose.Types.ObjectId): Promise<IVideo> {
    return this.videoModel.findById(id).lean();
  }

  async findByProjectId(projectId: mongoose.Types.ObjectId): Promise<IVideo[]> {
    return this.videoModel
      .find({
        projectId,
        archivedAt: { $eq: null },
      })
      .lean();
  }
}
