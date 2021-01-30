import { HttpService, Injectable, Logger } from '@nestjs/common';
import { of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { CryptoAvgRateDto } from 'src/Dtos/crypto-avg-rate-dto';
import { CryptoRateDto } from 'src/Dtos/crypto-rate-dto';
import { HistoricalRatesRequestParams } from 'src/Dtos/historical-rates-request-params';
import { AxiosRequestConfig } from 'axios';

const CRYPTO_RATE_PATH = '/api/cryptoRate';
const cryptoRateAccessorUrl = process.env.CRYPTO_RATE_ACCESSOR_URL || 'http://localhost:3009';

@Injectable()
export class RawCryptoRatesAccessor {
  private readonly logger = new Logger(RawCryptoRatesAccessor.name);

  constructor(private readonly http: HttpService){}

  getTotalRateCount(): PromiseLike<number> {
    this.logger.log(`Get total rate count`)
    const url = `${cryptoRateAccessorUrl}${CRYPTO_RATE_PATH}/rate-count`
    return this.http
    .get(url)
    .pipe(
      map(res => res.data as number),
      catchError(err => {
        this.logger.error(`Get total rate count finished with error ${err}`); 
          return of(null)
          })
    )
    .toPromise();
  }
  async getHistoricalCryptoRates(params: HistoricalRatesRequestParams): Promise<CryptoRateDto[]> {
    const url = `${cryptoRateAccessorUrl}${CRYPTO_RATE_PATH}/historical`
    return this.http
    .get(url,  {params: params})
    .pipe(
      map(res => res.data as CryptoRateDto),
      catchError(err => {
        this.logger.error(`Get historical rats finished with error ${err}`)
          return of(null)
          })
    )
    .toPromise();
  }

  async setCryptoRates(rates: CryptoRateDto[]): Promise<void> {
    const url = `${cryptoRateAccessorUrl}${CRYPTO_RATE_PATH}/save-rates`
    return this.http
    .post(url, rates)
    .pipe(
      catchError(err => {
        this.logger.error(`Save crypto rates finished with error ${err}`)
          return of(null)
          })
    )
    .toPromise();
  }

  async getAvarageCryptoRates(): Promise<CryptoAvgRateDto[]> {
    const url = `${cryptoRateAccessorUrl}${CRYPTO_RATE_PATH}/avg`
    return await this.http
    .get(url)
    .pipe(
      map(res => res.data as CryptoAvgRateDto),
      catchError(err => {
          this.logger.error(`Get average rates finished with error ${err}`)
          return of(null)
          })
    )
    .toPromise();
  }
}
