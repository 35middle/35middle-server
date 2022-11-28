import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { VideosRepo } from './video.repo';
import { VideoEntity } from './video.entity';

@Injectable()
export class VideoService {
  constructor(private readonly videoRepo: VideosRepo) {}

  async findAllByProjectId(projectId: string): Promise<VideoEntity[]> {
    const videos = await this.videoRepo.findByProjectId(
      new mongoose.Types.ObjectId(projectId),
    );
    return Promise.all(videos.map((video) => VideoEntity.fromObject(video)));
  }

  async archiveVideoById(videoId: string): Promise<VideoEntity> {
    const archivedVideo = await this.videoRepo.updateVideo(
      new mongoose.Types.ObjectId(videoId),
      {
        archivedAt: new Date(),
      },
    );

    return VideoEntity.fromObject(archivedVideo);
  }
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

  // async saveVideo(
  //   editVideoDto: EditVideoDto,
  //   videoId: mongoose.Types.ObjectId,
  // ): Promise<IVideo> {
  //   const session = await this.connection.startSession();
  //   session.startTransaction();

  //   try {
  //     const updatedVideo = await this.videoRepo.saveVideo(
  //       editVideoDto,
  //       videoId,
  //       videoTitle,
  //       videoDescription,
  //       session,
  //     );
  //     await session.commitTransaction();
  //     return updatedVideo;
  //   } catch (e) {
  //     await session.abortTransaction();
  //     throw e;
  //   } finally {
  //     await session.endSession();
  //   }
  // }
}
