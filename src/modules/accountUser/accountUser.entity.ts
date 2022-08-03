import { Expose, plainToClass } from "class-transformer"
import { IsMongoId, validateOrReject } from "class-validator"
import { Field, ID, ObjectType } from "type-graphql"

@ObjectType()
export class AccountUserEntity {
  @Field(() => ID)
  @IsMongoId()
  @Expose()
  _id: string

  static async fromObject(obj: Object): Promise<AccountUserEntity> {
    if (!obj) return null
    const instance = plainToClass(AccountUserEntity, obj, { exposeUnsetFields: false })
    await validateOrReject(instance)
    return instance
  }
}
