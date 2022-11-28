import { VideoEntity } from './video.entity';
import {
  Controller,
  Get,
  Delete,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { JwtGuard } from '../../guards/jwt.guard';

@Controller({ version: '1', path: 'videos' })
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  @UseGuards(JwtGuard)
  findAllByProjectId(@Query('projectId') projectId): Promise<VideoEntity[]> {
    return this.videoService.findAllByProjectId(projectId);
  }

  @Delete(':videoId')
  @UseGuards(JwtGuard)
  archiveVideoById(@Param('videoId') videoId): Promise<VideoEntity> {
    return this.videoService.archiveVideoById(videoId);
  }

  // @Post('/:upload')
  // async newVideo(
  //   @Body() createVideoDto: CreateVideoDto,
  //   @Param('videoId') videoId: mongoose.Types.ObjectId,
  // ): Promise<VideoEntity> {
  //   const video = await this.videoService.createVideo(createVideoDto, videoId);
  //   return VideoEntity.fromObject(video);
  // }

  // @UseInterceptors(
  //   FileInterceptor('files', {
  //     storage: diskStorage({
  //       destination: './uploadedFiles/video',
  //       filename: (
  //         req: Express.Request,
  //         file: Express.Multer.File,
  //         callback: (error: Error | null, filename: string) => void,
  //       ) => {
  //         const fileName =
  //           path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
  //         const extension = path.parse(file.originalname).ext;
  //         callback(null, `${fileName}${extension}`);
  //       },
  //     }),
  //   }),
  // )
  // async createVideo(
  //   @Body('videoId') videoId: string,
  //   @Body('videoTitle') videoTitle: string,
  //   @Body('videoDescription') videoDescription: string,
  //   @UploadedFile() file: Express.Multer.File,
  // ): Promise<VideoEntity> {
  //   return this.videoService.createVideo(
  //     id,
  //     videoId,
  //     videoTitle,
  //     videoDescription,
  //   );
  // }

  // @Get('/:videoId')
  // async readVideo(
  //   @Param('videoId') videoId: mongoose.Types.ObjectId,
  // ): Promise<VideoEntity> {
  //   const video = this.videoService.getVideo(videoId);
  //   return VideoEntity.fromObject(video);
  // }

  // @Put('/:videoId')
  // async saveVideo(
  //   @Body() editVideoDto: EditVideoDto,
  //   @Param() videoId: mongoose.Types.ObjectId,
  // ): Promise<VideoEntity> {
  //   const video = this.videoService.saveVideo(editVideoDto, videoId);
  //   return VideoEntity.fromObject(video);
  // }
}
