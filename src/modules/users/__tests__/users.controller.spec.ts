import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

// describe('findAll', () => {
//   it('should return an array of users', async () => {
//     const result = ['test'];
//     jest.spyOn(UsersService, 'findAll').mockImplementation(() => result);

//     expect(await UsersController.findAll()).toBe(result);
//   });
// });
