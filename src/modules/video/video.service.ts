import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateVideoDto } from './dto/createVideo.dto';
import { IVideo } from './types/index';
import { VideosRepo } from './video.repo';
import { EditVideoDto } from './dto/updateVideo.dto';

@Injectable()
export class VideoService {
  private readonly logger = new Logger(VideoService.name);

  constructor(
    private readonly videoRepo: VideosRepo,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async createVideo(
    createVideoDto: CreateVideoDto,
    videoId: mongoose.Types.ObjectId,
  ): Promise<IVideo> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const newVideo = await this.videoRepo.createVideo(
        createVideoDto,
        videoId,
        videoTitle,
        videoDescription,
        session,
      );
      await session.commitTransaction();
      return newVideo;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }

  async saveVideo(
    editVideoDto: EditVideoDto,
    videoId: mongoose.Types.ObjectId,
  ): Promise<IVideo> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const updatedVideo = await this.videoRepo.saveVideo(
        editVideoDto,
        videoId,
        videoTitle,
        videoDescription,
        session,
      );
      await session.commitTransaction();
      return updatedVideo;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }

  async getVideo(videoId: mongoose.Types.ObjectId): Promise<IVideo> {
    const video = this.videoRepo.findById(videoId);
    return video;
  }
}