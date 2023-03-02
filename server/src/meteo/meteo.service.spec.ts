import { Test, TestingModule } from '@nestjs/testing';
import { MeteoService } from './meteo.service';

describe('MeteoService', () => {
  let service: MeteoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeteoService],
    }).compile();

    service = module.get<MeteoService>(MeteoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
