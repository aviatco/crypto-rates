import { Test, TestingModule } from '@nestjs/testing';
import { CryptoRateService } from './crypto-rate.service';

describe('CryptoRateService', () => {
  let service: CryptoRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoRateService],
    }).compile();

    service = module.get<CryptoRateService>(CryptoRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
