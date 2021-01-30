import { Injectable } from '@nestjs/common';
import { HistoricalRatesRequestParams } from './crypto-rate/dtos/historical-rates-request-params';
import { CryptoAvgRate } from './crypto-rate/entities/crypto-avg-rate/crypto-avg-rate.entity';
import { CryptoRate } from './crypto-rate/entities/crypto-rate/crypto-rate.entity';
import { CryptoAvgRateService } from './crypto-rate/repositories/crypto-avg-rate-repo/crypto-avg-rate.service';
import { CryptoRateService } from './crypto-rate/repositories/crypto-rate-repo/crypto-rate.service';

@Injectable()
export class AppService {
  constructor( private readonly cryptoRateService: CryptoRateService,
    private readonly cryptoAvgRateService: CryptoAvgRateService){}
  
    async getHistoricalRates(params: HistoricalRatesRequestParams): Promise<CryptoRate[]> {
      return await this.cryptoRateService.getHistoricalRates(params);
    }

    async saveCreptoRate(rates: CryptoRate[]): Promise<void> {
      await this.cryptoRateService.saveRates(rates);
      await this.cryptoAvgRateService.saveLatestAvgRate(rates);
    }

    async getAvarageCryptoRates(): Promise<CryptoAvgRate[]> {
      return await this.cryptoAvgRateService.getLatestAvgRate();
    }

    async getTotalRateCount(): Promise<number>{
      return await this.cryptoRateService.getTotalRateCount();
    }
}
