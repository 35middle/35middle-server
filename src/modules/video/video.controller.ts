import { VideoEntity } from './video.entity';
import mongoose from 'mongoose';
import { EditVideoDto } from './dto/editVideo.dto';
import { CreateVideoDto } from './dto/createVideo.dto';
import { Body, Controller, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { callbackify } from 'util';

@Controller({ version: '1', path: 'newVideo' })
export class VideoController {
  constructor(private readonly videoService: VideoService) { }
  
  @Post('/:upload')
  async newVideo(
    @Body() createVideoDto: CreateVideoDto,
    @Param('videoId') videoId: mongoose.Types.ObjectId,
  ): Promise<VideoEntity> {
    const video = this.videoService.newVideo(createVideoDto, videoId);
    return VideoEntity.fromObject(video);
  }
  @UseInterceptors(FileInterceptor('files', {
    storage: diskStorage({
      destination: './video',
      filename: (req, file, callback) => {

      }
    })
  }))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    // return 'Video upload API';
}

  @Get('/:videoId')
  async readVideo(
    @Param('videoId') videoId: mongoose.Types.ObjectId,
  ): Promise<VideoEntity> {
    const video = this.videoService.getVideo(videoId);
    return VideoEntity.fromObject(video);
  };

  @Put('/:videoId')
  async saveButton(
    @Body() editVideoDto: EditVideoDto,
    @Param() videoId: mongoose.Types.ObjectId,
  ): Promise<VideoEntity> {
    const video = this.videoService.saveVideo(editVideoDto, videoId);
    return VideoEntity.fromObject(video);
  }
} 
