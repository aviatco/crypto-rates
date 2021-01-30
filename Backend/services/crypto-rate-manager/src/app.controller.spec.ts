import { Test, TestingModule } from '@nestjs/testing';
import { RawCryptoRatesAccessor } from './accessors/raw-crypto-rates-accessor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoAvgRateDto } from './Dtos/crypto-avg-rate-dto';
import { CryptoRateDto } from './Dtos/crypto-rate-dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, 
        {
          provide: RawCryptoRatesAccessor, 
          useValue: {
            getHistoricalCryptoRates: ({skip: number}) => Promise.resolve([] as CryptoRateDto[]),
            getAvarageCryptoRates:() =>  Promise.resolve([] as CryptoAvgRateDto[]),
            getTotalRateCount: () => Promise.resolve(0),
          }
        }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return HistoricalCryptoRates', () => {
      //expect(appController.getHistoricalCryptoRates()).toBe();
    });
  });
});
