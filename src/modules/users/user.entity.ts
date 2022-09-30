import { plainToClass, Transform, Expose } from 'class-transformer';

export class UserEntity {
  @Expose()
  @Transform(({ value }) => value.toString(), { toClassOnly: true })
  _id: string;

  @Expose()
  email: string;

  static async fromObject(obj: unknown): Promise<UserEntity> {
    if (!obj) return null;
    return plainToClass(UserEntity, obj, { excludeExtraneousValues: true });
  }
}
