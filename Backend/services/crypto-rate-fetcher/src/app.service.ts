import { Injectable } from '@nestjs/common';
import { CoinmarketcapFetcher } from './accessors/crypto-rates-source-accessor/source-fetcher/coinmarketcap-fetcher';
import { CryptocompareFetcher } from './accessors/crypto-rates-source-accessor/source-fetcher/cryptocompare-fetcher';

@Injectable()
export class AppService {
  constructor(private readonly coinmarketcapFetcher: CoinmarketcapFetcher,
    private readonly cryptocompareFetcher: CryptocompareFetcher ){}
    
  async getCreptoRates(): Promise<any> {
    const rateResults = [];
    rateResults.push(...(await this.coinmarketcapFetcher.fetchCryptoRates()));
    rateResults.push(...(await this.cryptocompareFetcher.fetchCryptoRates()));
    return rateResults;
  }
}
