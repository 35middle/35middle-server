import { Expose, plainToClass } from 'class-transformer';

export class ForgetPasswordEntity {
  @Expose()
  success: boolean;

  static async fromObject(obj: unknown): Promise<ForgetPasswordEntity> {
    if (!obj) return null;
    return plainToClass(ForgetPasswordEntity, obj, {
      excludeExtraneousValues: true,
    });
  }
}
