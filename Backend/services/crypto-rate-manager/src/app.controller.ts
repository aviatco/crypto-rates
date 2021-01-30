import { Controller, Get, Query } from '@nestjs/common';
import { RawCryptoRatesAccessor } from './accessors/raw-crypto-rates-accessor';
import { AppService } from './app.service';
import { CryptoAvgRateDto } from './Dtos/crypto-avg-rate-dto';
import { CryptoRateDto } from './Dtos/crypto-rate-dto';
import { HistoricalRatesRequestParams } from './Dtos/historical-rates-request-params';

@Controller('api/cryptoRate')
export class AppController {
  constructor(private readonly rawCryptoRatesAccessor: RawCryptoRatesAccessor) {}

  @Get('historical')
  getHistoricalCryptoRates(@Query() params: HistoricalRatesRequestParams): Promise<CryptoRateDto[]> {
    return this.rawCryptoRatesAccessor.getHistoricalCryptoRates(params);
  }

  @Get('avg')
  getAvarageCryptoRates():  Promise<CryptoAvgRateDto[]> {
    return this.rawCryptoRatesAccessor.getAvarageCryptoRates();
  }

  @Get('rate-count')
  async getTotalRateCount(): Promise<number>{
    return this.rawCryptoRatesAccessor.getTotalRateCount();
  }
}
