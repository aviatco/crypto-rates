import { Test, TestingModule } from '@nestjs/testing';
import { CryptoRatesFetcherAccessor } from '../../accessors/crypro-rate-fetcher-accessor'
import { RawCryptoRatesAccessor } from '../../accessors/raw-crypto-rates-accessor';
import { CryptoRateDto } from '../../Dtos/crypto-rate-dto';
import { FetchRatesService } from './fetch-rates.service';

describe('FetchRatesService', () => {
  let service: FetchRatesService;
  const cryptoFetchResult: CryptoRateDto[] = [];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchRatesService,
      {
        provide: CryptoRatesFetcherAccessor,
        useValue: {
          fetchCryptoRates: () => Promise.resolve(cryptoFetchResult)
        }
    },
    {
      provide: RawCryptoRatesAccessor,
      useValue: {
        setCryptoRates: (cryptoFetchResult: CryptoRateDto[]) => Promise.resolve()
      }
    }
  ],
    }).compile();

    service = module.get<FetchRatesService>(FetchRatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.handleCron()).toBeCalled();
    });
});
