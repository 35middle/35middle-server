import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { mock, instance, when, anything, verify } from 'ts-mockito';
import { CreateUserDto } from '../dto/createUser.dto';
import { UsersRepo } from '../users.repo';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { UserEntity } from '../user.entity';

describe('UsersService', () => {
  let service: UsersService;

  // mock user repo
  const mockUsersRepo = mock(UsersRepo);

  const mockCreatedUser = {
    _id: new mongoose.Types.ObjectId(faker.database.mongodbObjectId()),
    email: faker.internet.email(),
    password: faker.random.word(),
    archivedAt: null,
    createdAt: faker.date.future(),
    updatedAt: faker.date.future(),
  };

  beforeEach(async () => {
    // mock user service and return mocked user entity
    when(mockUsersRepo.create(anything())).thenResolve(mockCreatedUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepo, useValue: instance(mockUsersRepo) },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', async () => {
    const mockCreateUserDto = mock(CreateUserDto);
    const mockCreatedUserDtoInstance = instance(mockCreateUserDto);

    expect(await service.createUser(mockCreatedUserDtoInstance)).toEqual(
      await UserEntity.fromObject(mockCreatedUser),
    );

    verify(mockUsersRepo.create(mockCreatedUserDtoInstance)).once();
  });
});
