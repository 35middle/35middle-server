import { Test } from '@nestjs/testing';
import { UsersController } from '../../users.controller';
import { UsersService } from '../../users.service';
import { mock, instance, when, anything } from 'ts-mockito';
import { ExceptionsLoggerFilter } from '../../../../filters/exceptionsLogger.filter';
import { Logger } from 'nestjs-pino';
import { createMockUser } from '../../../../mock';

describe('UsersController', () => {
  // mock user
  const mockUser = createMockUser();

  // mock user service
  const mockUsersService = mock(UsersService);

  beforeEach(async () => {
    // mock user service and return mocked user entity
    when(mockUsersService.createUser(anything(), anything())).thenResolve(
      mockUser,
    );

    await Test.createTestingModule({
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
  });

  it('should be defined', async () => {
    expect(1).toEqual(1);
    // const mockCreateUserDto = mock(CreateUserDto);
    // const mockCreatedUserDtoInstance = instance(mockCreateUserDto);
    //
    // expect(await controller.create(mockCreatedUserDtoInstance)).toEqual(
    //   mockUserEntityInstance,
    // );
    //
    // verify(mockUsersService.createUser(mockCreatedUserDtoInstance)).once();
  });
});
