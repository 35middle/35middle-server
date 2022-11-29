import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { VideosRepo } from './video.repo';
import { VideoEntity } from './video.entity';
import { getVideoDurationInSeconds } from 'get-video-duration';
import { uuid } from 'uuidv4';
import * as path from 'path';
import { randomGenerateTimestamps } from '../../utils/randomGenerateTimestamps';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpeg = require('fluent-ffmpeg');

@Injectable()
export class VideoService {
  constructor(private readonly videoRepo: VideosRepo) {}

  async saveVideo({
    name,
    videoUrl,
    preview,
    thumbnail,
    projectId,
  }: {
    name: string;
    projectId: string;
    videoUrl: string;
    thumbnail: string;
    preview: string;
  }): Promise<VideoEntity> {
    const video = await this.videoRepo.createVideo({
      name,
      videoUrl,
      preview,
      thumbnail,
      projectId: new mongoose.Types.ObjectId(projectId),
    });

    return VideoEntity.fromObject(video);
  }

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

  async generateThumbnail(videoFile: Express.Multer.File): Promise<string> {
    const videoDuration = await getVideoDurationInSeconds(videoFile.path);
    console.log(videoDuration);

    const thumbnailFilename = `thumbnail-${uuid()}.png`;

    return new Promise((resolve) => {
      ffmpeg(videoFile.path)
        .screenshots({
          count: 1,
          filename: thumbnailFilename,
          folder: path.join(process.cwd(), 'uploadedFiles', 'videoThumbnails'),
          timemarks: [randomGenerateTimestamps(videoDuration)],
        })
        .on('end', () => {
          resolve(thumbnailFilename);
        });
    });
  }

  async generatePreview(videoFile: Express.Multer.File): Promise<string> {
    const videoPreviewFilename = `preview-${uuid()}.gif`;
    const videoPreviewFilePath = path.join(
      process.cwd(),
      'uploadedFiles',
      'videoPreview',
      videoPreviewFilename,
    );

    return new Promise((resolve) => {
      ffmpeg(videoFile.path)
        .setStartTime('00:00:00')
        .setDuration(5)
        .fps(30)
        .output(videoPreviewFilePath)
        .on('end', () => {
          resolve(videoPreviewFilename);
        })
        .run();
    });
  }
}
