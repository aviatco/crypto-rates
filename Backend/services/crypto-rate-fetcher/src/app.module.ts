import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SourceFetcherBase } from './accessors/crypto-rates-source-accessor/source-fetcher/source-fetcher-base';
import { CoinmarketcapFetcher } from './accessors/crypto-rates-source-accessor/source-fetcher/coinmarketcap-fetcher';
import { CryptocompareFetcher } from './accessors/crypto-rates-source-accessor/source-fetcher/cryptocompare-fetcher';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, CoinmarketcapFetcher, CryptocompareFetcher],
})
export class AppModule {}
