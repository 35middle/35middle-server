import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './video.schema';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { VideosRepo } from './video.repo';
import { S3Service } from '../../services/s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  ],
  controllers: [VideoController],
  providers: [VideoService, VideosRepo, S3Service],
  exports: [VideoService],
})
export class VideoModule {}
