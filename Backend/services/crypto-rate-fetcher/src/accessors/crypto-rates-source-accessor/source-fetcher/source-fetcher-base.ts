import { CryptoRateDto } from "../dtos/crypto-rate-dto";
import { HttpService, Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FetcherRequestDto } from "../dtos/fetcher-request-dto";

@Injectable()
export abstract class SourceFetcherBase {
    private readonly logger = new Logger(SourceFetcherBase.name);
    url: string;
    source: string;
    apiKey: string;
    params: any;
    symbolNameHash = {
        'ETH': 'Ethereum',
        'BTC': 'Bitcoin',
        'LTC': 'Litecoin'
    };
    constructor(protected readonly http: HttpService){};
    
    public async fetchCryptoRatesFromSource(): Promise<any>{
            const url = this.url;
            const config: AxiosRequestConfig = {headers: {"X-CMC_PRO_API_KEY": this.apiKey}};
            if(this.params){
                config.params = this.params;
            }
            const result = await this.http.
            get(url,config)
            .pipe(
                catchError(err => {
                    this.logger.error(`Fetching rates from source: ${this.source} finished with error ${err}`); 
                    return of(null)
                    })
            )
            .toPromise();
        this.logger.log('Done fetching data');
        return result;
    }

    abstract mapToCryptoRateDto(ratesData: any): CryptoRateDto[];
}