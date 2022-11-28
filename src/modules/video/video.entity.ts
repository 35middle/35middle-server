import { Expose, plainToClass, Transform } from 'class-transformer';

export class VideoEntity {
  @Expose()
  @Transform(({ obj }) => {
    return obj._id.toString();
  })
  id: string;

  @Expose()
  videoTitle: string;

  @Expose()
  videoDescription: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.accountId.toString();
  })
  accountId: string;

  static async fromObject(obj: unknown): Promise<VideoEntity> {
    if (!obj) return null;
    return plainToClass(VideoEntity, obj, { excludeExtraneousValues: true });
  }
}
