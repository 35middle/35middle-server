import { AccountUserEntity } from "@modules/accountUser/accountUser.entity"
import { Query, Resolver } from "type-graphql"
import { Service } from "typedi"

@Service()
@Resolver(AccountUserEntity)
export class AccountUserResolver {
  @Query(() => AccountUserEntity, { name: "Test" })
  async test(): Promise<AccountUserEntity> {
    return AccountUserEntity.fromObject({
      _id: "5775c4846084472efa497481"
    })
  }
}
