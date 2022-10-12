import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users.service';
import { mock, instance, when, anything, verify } from 'ts-mockito';
import { CreateUserDto } from '../../dto/createUser.dto';
import { UsersRepo } from '../../users.repo';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../../user.entity';
import { IUser } from '../../types';
import mongoose from 'mongoose';

describe('UsersService.createUser', () => {
  let service: UsersService;

  // mock user repo
  const mockUsersRepo = mock(UsersRepo);

  const mockCreatedUser: IUser = {
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

  beforeEach(async () => {
    // mock user service and return mocked user entity
    when(
      mockUsersRepo.createUser(anything(), anything(), anything()),
    ).thenResolve(mockCreatedUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepo, useValue: instance(mockUsersRepo) },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should invoke repo layer with correct arguments and return new created user entity', async () => {
    const mockCreateUserDto = instance(mock(CreateUserDto));
    const mockAccountId = new mongoose.Types.ObjectId(
      faker.database.mongodbObjectId(),
    );

    expect(await service.createUser(mockCreateUserDto, mockAccountId)).toEqual(
      await UserEntity.fromObject(mockCreatedUser),
    );

    verify(
      mockUsersRepo.createUser(mockCreateUserDto, mockAccountId, undefined),
    ).once();
  });
});
