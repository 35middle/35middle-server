import { Expose, plainToClass, Transform } from 'class-transformer';

export class VideoEntity {
  @Expose()
  @Transform(({ obj }) => {
    return obj._id.toString();
  })
  _id: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.videoId.toString();
  })
  @Expose()
  videoTitle: string;

  @Expose()
  videoDescription: string;

  static async fromObject(obj: unknown): Promise<VideoEntity> {
    if (!obj) return null;
    return plainToClass(VideoEntity, obj, { excludeExtraneousValues: true });
  }
}