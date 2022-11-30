import { VideoEntity } from './video.entity';
import {
  Controller,
  Get,
  Delete,
  Query,
  UseGuards,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Res,
  Logger,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { JwtGuard } from '../../guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express, Response } from 'express';
import * as path from 'path';
import { uuid } from 'uuidv4';
import { createReadStream, readFileSync } from 'fs';
import { S3Service } from '../../services/s3.service';
import { getVideoDurationInSeconds } from 'get-video-duration';

@Controller({ version: '1', path: 'videos' })
export class VideoController {
  private readonly logger = new Logger(VideoController.name);
  constructor(
    private readonly videoService: VideoService,
    private readonly s3Service: S3Service,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  findAllByProjectId(@Query('projectId') projectId): Promise<VideoEntity[]> {
    return this.videoService.findAllByProjectId(projectId);
  }

  @Get(':videoId')
  @UseGuards(JwtGuard)
  findVideoById(@Param('videoId') videoId): Promise<VideoEntity> {
    return this.videoService.findVideoById(videoId);
  }

  @Delete(':videoId')
  @UseGuards(JwtGuard)
  archiveVideoById(@Param('videoId') videoId): Promise<VideoEntity> {
    return this.videoService.archiveVideoById(videoId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('videoFile', {
      storage: diskStorage({
        destination: './uploadedFiles/projectVideos',
        filename(
          req: Express.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
          const extension = path.parse(file.originalname).ext;
          callback(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  async createVideo(
    @Body('name') name: string,
    @Body('projectId') projectId: string,
    @UploadedFile() videoFile: Express.Multer.File,
  ): Promise<VideoEntity> {
    const length = Math.round(await getVideoDurationInSeconds(videoFile.path));
    const blob = readFileSync(videoFile.path);
    await this.s3Service.uploadFile(blob, videoFile.filename);
    const videoThumbnail = await this.videoService.generateThumbnail(videoFile);
    const videoPreview = await this.videoService.generatePreview(videoFile);

    const videoEntity = await this.videoService.saveVideo({
      name,
      projectId,
      videoUrl: `https://video.35middle.com/videos/${videoFile.filename}`,
      thumbnail: videoThumbnail,
      preview: videoPreview,
      length,
    });

    return videoEntity;
  }

  @Get('video-thumbnail/:thumbnail')
  fetchVideoThumbnail(
    @Param('thumbnail') thumbnail: string,
    @Res() res: Response,
  ) {
    return createReadStream(
      path.join(process.cwd(), 'uploadedFiles', 'videoThumbnails', thumbnail),
    )
      .on('error', (err) => {
        this.logger.log(`{thumbnail} is not found`, err);
      })
      .pipe(res);
  }

  @Get('video-preview/:preview')
  fetchVideoPreview(@Param('preview') preview: string, @Res() res: Response) {
    return createReadStream(
      path.join(process.cwd(), 'uploadedFiles', 'videoPreview', preview),
    )
      .on('error', (err) => {
        this.logger.log(`{preview} is not found`, err);
      })
      .pipe(res);
  }
}
