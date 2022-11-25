import { VideoEntity } from './video.entity';
import mongoose from 'mongoose';
import { EditVideoDto } from './dto/updateVideo.dto';
import { CreateVideoDto } from './dto/createVideo.dto';
import { Body, Controller, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { callbackify } from 'util';
import { Express, Response } from 'express';
import * as path from 'path';
import { uuid } from 'uuidv4';

@Controller({ version: '1', path: 'video' })
export class VideoController {
  constructor(private readonly videoService: VideoService) { }
  
  @Post('/:upload')
  async newVideo(
    @Body() createVideoDto: CreateVideoDto,
    @Param('videoId') videoId: mongoose.Types.ObjectId,
  ): Promise<VideoEntity> {
    const video = this.videoService.createVideo(createVideoDto, videoId);
    return VideoEntity.fromObject(video);
  }
  @UseInterceptors(FileInterceptor('files', {
    storage: diskStorage({
      destination: './uploadedFiles/video',
      filename: (
        req: Express.Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void,
      ) => {
        const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
          const extension = path.parse(file.originalname).ext;
          callback(null, `${fileName}${extension}`);
      },
    })
  }))
    
  async createVideo(
    @Body('videoId') videoId: string,
    @Body('videoTitle') videoTitle: string,
    @Body('videoDescription') videoDescription: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<VideoEntity> {
    return this.videoService.createVideo(
      id,
      videoId,
      videoTitle,
      videoDescription,
    );
  }

  @Get('/:videoId')
  async readVideo(
    @Param('videoId') videoId: mongoose.Types.ObjectId,
  ): Promise<VideoEntity> {
    const video = this.videoService.getVideo(videoId);
    return VideoEntity.fromObject(video);
  };

  @Put('/:videoId')
  async saveVideo(
    @Body() editVideoDto: EditVideoDto,
    @Param() videoId: mongoose.Types.ObjectId,
  ): Promise<VideoEntity> {
    const video = this.videoService.saveVideo(editVideoDto, videoId);
    return VideoEntity.fromObject(video);
  }
} 
