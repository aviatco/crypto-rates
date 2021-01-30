import { Test, TestingModule } from '@nestjs/testing';
import { CryptoAvgRateService } from './crypto-avg-rate.service';

describe('CryptoAvgRateService', () => {
  let service: CryptoAvgRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoAvgRateService],
    }).compile();

    service = module.get<CryptoAvgRateService>(CryptoAvgRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
