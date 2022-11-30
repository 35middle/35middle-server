import { Expose, plainToClass, Transform } from 'class-transformer';

export class VideoEntity {
  @Expose()
  @Transform(({ obj }) => {
    return obj._id.toString();
  })
  id: string;

  @Expose()
  name: string;

  @Expose()
  thumbnail: string;

  @Expose()
  preview: string;

  @Expose()
  length: number;

  @Expose()
  videoUrl: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.projectId.toString();
  })
  projectId: string;

  static async fromObject(obj: unknown): Promise<VideoEntity> {
    if (!obj) return null;
    return plainToClass(VideoEntity, obj, { excludeExtraneousValues: true });
  }
}
