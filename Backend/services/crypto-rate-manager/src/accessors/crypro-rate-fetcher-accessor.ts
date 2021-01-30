import { HttpService, Injectable, Logger } from '@nestjs/common';
import { of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { AxiosRequestConfig } from 'axios';
import { CryptoRateDto } from 'src/Dtos/crypto-rate-dto';

const CRYPTO_RATE_PATH = '/api/cryptoRates';
const cryptoRateFetcherUrl = process.env.CRYPTO_RATE_FETCHER_URL || 'http://localhost:6002';

@Injectable()
export class CryptoRatesFetcherAccessor {
  private readonly logger = new Logger(CryptoRatesFetcherAccessor.name);

  constructor(private readonly http: HttpService){}

  async fetchCryptoRates(): Promise<CryptoRateDto[]> {
    const url = `${cryptoRateFetcherUrl}${CRYPTO_RATE_PATH}`
    const config: AxiosRequestConfig = {headers: 'application/json'}
    return this.http
    .get(url)
    .pipe(
      map(res => res.data as CryptoRateDto[]),
      catchError(err => {
        this.logger.error(`Sending request to fetche rates finished with error ${err}`); 
          return of(null)
          })
    )
    .toPromise();
  }
}
