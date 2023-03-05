import { Test, TestingModule } from '@nestjs/testing';
import { LinearController } from './linear.controller';

describe('LinearController', () => {
  let controller: LinearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinearController],
    }).compile();

    controller = module.get<LinearController>(LinearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
