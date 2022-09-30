import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  user: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  dbName: process.env.MONGO_DATABASE,
  host: process.env.MONGO_HOST,
}));
