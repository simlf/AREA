import { Test, TestingModule } from '@nestjs/testing';
import { NasaService } from './nasa.service';

describe('NasaService', () => {
  let service: NasaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NasaService],
    }).compile();

    service = module.get<NasaService>(NasaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
