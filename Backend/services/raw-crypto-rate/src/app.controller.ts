import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { HistoricalRatesRequestParams } from './crypto-rate/dtos/historical-rates-request-params';
import { CryptoAvgRate } from './crypto-rate/entities/crypto-avg-rate/crypto-avg-rate.entity';
import { CryptoRate } from './crypto-rate/entities/crypto-rate/crypto-rate.entity';

@Controller('api/cryptoRate')
export class AppController {
  constructor(private readonly service: AppService
    ) {}

  @Get('historical')
  async getHistoricalCryptoRates(@Query() params: HistoricalRatesRequestParams): Promise<CryptoRate[]> {
    return await this.service.getHistoricalRates(params);
  }

  @Get('rate-count')
  async getTotalRateCount(): Promise<number>{
    return this.service.getTotalRateCount();
  }

  @Post('save-rates')
  async satCreptoRate(@Body() rates: CryptoRate[]): Promise<void> {
    await this.service.saveCreptoRate(rates);
  }

  @Get('avg')
  async getAvarageCryptoRates(): Promise<CryptoAvgRate[]> {
    return await this.service.getAvarageCryptoRates();
  }
}
