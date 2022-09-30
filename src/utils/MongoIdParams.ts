import { IsMongoId } from 'class-validator';

export class MongoIdParams {
  @IsMongoId()
  id: string;
}
