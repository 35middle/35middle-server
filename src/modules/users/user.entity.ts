import { plainToClass, Transform, Expose } from 'class-transformer';

export class UserEntity {
  @Expose()
  @Transform(({ obj }) => {
    return obj._id.toString();
  })
  _id: string;

  @Expose()
  email: string;

  @Expose()
  lastName: string;

  @Expose()
  firstName: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj._id.toString();
  })
  accountId: string;

  static async fromObject(obj: unknown): Promise<UserEntity> {
    if (!obj) return null;
    return plainToClass(UserEntity, obj, { excludeExtraneousValues: true });
  }
}
