import { Expose, plainToClass } from 'class-transformer';

export class LoginEntity {
  @Expose()
  success: boolean;

  static async fromObject(obj: unknown): Promise<LoginEntity> {
    if (!obj) return null;
    return plainToClass(LoginEntity, obj, {
      excludeExtraneousValues: true,
    });
  }
}
