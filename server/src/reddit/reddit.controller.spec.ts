import { Test, TestingModule } from '@nestjs/testing';
import { RedditController } from './reddit.controller';

describe('RedditController', () => {
  let controller: RedditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedditController],
    }).compile();

    controller = module.get<RedditController>(RedditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
