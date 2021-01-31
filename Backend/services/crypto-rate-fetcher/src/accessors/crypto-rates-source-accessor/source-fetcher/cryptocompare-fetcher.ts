import { HttpService, Injectable } from "@nestjs/common";
import { CryptoRateDto } from "../dtos/crypto-rate-dto";
import { SourceFetcherBase } from "./source-fetcher-base";

@Injectable()
export class CryptocompareFetcher extends SourceFetcherBase {
    url: string = process.env.CRYPTOCOMPARE_API_URL;
    source: string = 'Cryptocompare';
    apiKey: string = process.env.CRYPTOCOMPARE_API_KEY;
    params:any = {
        fsyms:"ETH,BTC,LTC",
        tsyms:"USD"
    }


    constructor(protected readonly http: HttpService){
        super(http);
    }

    public async fetchCryptoRates(): Promise<CryptoRateDto[]> {
        const rateResult = await this.fetchCryptoRatesFromSource();
        return this.mapToCryptoRateDto(rateResult.data);
    }

    mapToCryptoRateDto(ratesData: any): CryptoRateDto[] { 
        return Object.keys(ratesData).map(symbol => {
            return {
                    name: this.symbolNameHash[symbol],
                    symbol,
                    currency: 'USD',
                    rate: ratesData[symbol]['USD'],
                    lastUpdated: new Date(),
                    source: this.source
                    } as CryptoRateDto
        });
    };
}