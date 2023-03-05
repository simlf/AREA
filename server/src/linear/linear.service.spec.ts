import { Test, TestingModule } from '@nestjs/testing';
import { LinearService } from './linear.service';

describe('LinearService', () => {
  let service: LinearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinearService],
    }).compile();

    service = module.get<LinearService>(LinearService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
