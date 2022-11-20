import { plainToClass, Transform, Expose } from 'class-transformer';

export class ProjectEntity {
  @Expose()
  @Transform(({ obj }) => {
    return obj._id.toString();
  })
  id: string;

  @Expose()
  name: string;

  @Expose()
  brandColor: string;

  @Expose()
  logoPath: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.accountId.toString();
  })
  accountId: string;

  static async fromObject(obj: unknown): Promise<ProjectEntity> {
    if (!obj) return null;
    return plainToClass(ProjectEntity, obj, { excludeExtraneousValues: true });
  }
}
