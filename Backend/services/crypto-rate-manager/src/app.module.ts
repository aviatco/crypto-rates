import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule/dist/schedule.module';
import { CryptoRatesFetcherAccessor } from './accessors/crypro-rate-fetcher-accessor';
import { RawCryptoRatesAccessor } from './accessors/raw-crypto-rates-accessor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FetchRatesService } from './scheduler/fetch-rates/fetch-rates.service';

@Module({
  imports: [HttpModule,  ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, FetchRatesService, RawCryptoRatesAccessor, CryptoRatesFetcherAccessor],
})
export class AppModule {}
