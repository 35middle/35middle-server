import { IUser } from '../modules/users/types';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

export const createMockUser = (): IUser => {
  return {
    _id: new mongoose.Types.ObjectId(faker.database.mongodbObjectId()),
    accountId: new mongoose.Types.ObjectId(faker.database.mongodbObjectId()),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.random.word(),
    archivedAt: null,
    createdAt: faker.date.future(),
    updatedAt: faker.date.future(),
  };
};
