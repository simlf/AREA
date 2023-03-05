import { Test, TestingModule } from '@nestjs/testing';
import { RedditService } from './reddit.service';

describe('RedditService', () => {
  let service: RedditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedditService],
    }).compile();

    service = module.get<RedditService>(RedditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
