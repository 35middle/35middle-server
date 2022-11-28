import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { EditVideoDto } from './dto/editVideo.dto';
import { IVideo } from './types/index';
import { VideosRepo } from './video.repo';

@Injectable()
export class VideoService {
  private readonly logger = new Logger(VideoService.name);

  constructor(
    private readonly videoRepo: VideosRepo,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  // async createVideo(
  //   createVideoDto: CreateVideoDto,
  //   videoId: mongoose.Types.ObjectId,
  // ): Promise<IVideo> {
  //   const session = await this.connection.startSession();
  //   session.startTransaction();

  //   try {
  //     const newVideo = await this.videoRepo.createVideo(
  //       createVideoDto,
  //       videoId,
  //       videoTitle,
  //       videoDescription,
  //       session,
  //     );
  //     await session.commitTransaction();
  //     return newVideo;
  //   } catch (e) {
  //     await session.abortTransaction();
  //     throw e;
  //   } finally {
  //     await session.endSession();
  //   }
  // }

  async updateVideo(
    videoId: mongoose.Types.ObjectId,
    editVideoDto: EditVideoDto,
  ): Promise<IVideo> {
    return this.videoRepo.updateVideo(
      videoId,
      editVideoDto.title,
      editVideoDto.description,
    );
  }

  async getVideo(videoId: mongoose.Types.ObjectId): Promise<IVideo> {
    const video = this.videoRepo.findById(videoId);
    return video;
  }
}
