import { plainToClass, Transform, Expose } from 'class-transformer';

export class AccountEntity {
  @Expose()
  @Transform(({ obj }) => {
    return obj._id.toString();
  })
  _id: string;

  @Expose()
  companyName: string;

  @Expose()
  companyEmail: string;

  @Expose()
  companyMobile: string;

  @Expose()
  archivedAt: Date | null;

  static async fromObject(obj: unknown): Promise<AccountEntity> {
    if (!obj) return null;
    return plainToClass(AccountEntity, obj, { excludeExtraneousValues: true });
  }
}
