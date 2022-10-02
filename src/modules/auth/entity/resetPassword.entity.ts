import { Expose, plainToClass } from 'class-transformer';

export class ResetPasswordEntity {
  @Expose()
  success: boolean;

  static async fromObject(obj: unknown): Promise<ResetPasswordEntity> {
    if (!obj) return null;
    return plainToClass(ResetPasswordEntity, obj, {
      excludeExtraneousValues: true,
    });
  }
}
