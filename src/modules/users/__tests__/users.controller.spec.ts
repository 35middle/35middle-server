import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { mock, instance, when, anything, verify } from 'ts-mockito';
import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dto/createUser.dto';
import { ExceptionsLoggerFilter } from '../../../filters/exceptionsLogger.filter';
import { Logger } from 'nestjs-pino';

describe('UsersController', () => {
  let controller: UsersController;
  // mock user Entity
  const mockUserEntity = mock(UserEntity);
  const mockUserEntityInstance = instance(mockUserEntity);

  // mock user service
  const mockUsersService = mock(UsersService);

  beforeEach(async () => {
    // mock user service and return mocked user entity
    when(mockUsersService.createUser(anything())).thenResolve(
      mockUserEntityInstance,
    );

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: instance(mockUsersService),
        },
        {
          provide: ExceptionsLoggerFilter,
          useValue: mock(ExceptionsLoggerFilter),
        },
        {
          provide: Logger,
          useValue: mock(Logger),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', async () => {
    const mockCreateUserDto = mock(CreateUserDto);
    const mockCreatedUserDtoInstance = instance(mockCreateUserDto);

    expect(await controller.create(mockCreatedUserDtoInstance)).toEqual(
      mockUserEntityInstance,
    );

    verify(mockUsersService.createUser(mockCreatedUserDtoInstance)).once();
  });
});
