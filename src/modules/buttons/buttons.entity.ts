import { Expose, plainToClass, Transform } from 'class-transformer';

export class ButtonsEntity {
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
  buttonNickname: string;

  @Expose()
  buttonText: string;

  @Expose()
  buttonPositionVertical: number;

  @Expose()
  buttonPositionHorizontal: number;

  @Expose()
  buttonStyle: string;

  @Expose()
  buttonSize: string;

  @Expose()
  buttonLink: string | null;

  @Expose()
  buttonJump: number | null;

  @Expose()
  buttonStart: number;

  @Expose()
  buttonEnd: number;

  static async fromObject(obj: unknown): Promise<ButtonsEntity> {
    if (!obj) return null;
    return plainToClass(ButtonsEntity, obj, { excludeExtraneousValues: true });
  }
}
