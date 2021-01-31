import { HttpService, Injectable } from "@nestjs/common";
import { CryptoRateDto } from "../dtos/crypto-rate-dto";
import { SourceFetcherBase } from "./source-fetcher-base";

@Injectable()
export class CoinmarketcapFetcher extends SourceFetcherBase {
    url: string = process.env.COINMARKETCAP_API_URL;
    source: string = 'Coinmarketcap';
    apiKey: string = process.env.COINMARKETCAP_API_KEY;;
    params:any =  {
        symbol: "BTC,ETH,LTC"
    };
    constructor(protected readonly http: HttpService){
        super(http);
    }

    public async fetchCryptoRates(): Promise<CryptoRateDto[]> {
        const rateResult = await this.fetchCryptoRatesFromSource();
        return this.mapToCryptoRateDto(rateResult ? rateResult.data.data : {});
    }

    mapToCryptoRateDto(ratesData: any): CryptoRateDto[] {
        return Object.keys(ratesData).map(symbol => {
            return {
                    name: this.symbolNameHash[symbol],
                    symbol,
                    currency: 'USD',
                    rate: ratesData[symbol].quote['USD'].price,
                    lastUpdated: ratesData[symbol].quote['USD'].last_updated,
                    source: this.source
                    } as CryptoRateDto
        });
    };
}