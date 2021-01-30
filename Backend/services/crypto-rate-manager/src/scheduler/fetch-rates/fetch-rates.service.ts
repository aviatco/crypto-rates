import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CryptoRatesFetcherAccessor } from 'src/accessors/crypro-rate-fetcher-accessor';
import { RawCryptoRatesAccessor } from 'src/accessors/raw-crypto-rates-accessor';
import { CryptoRateDto } from 'src/Dtos/crypto-rate-dto';

@Injectable()
export class FetchRatesService {
    private readonly logger = new Logger(FetchRatesService.name);
    constructor(private cryptoRatesFetcherAccessor: CryptoRatesFetcherAccessor,
        private rawCryptoRatesAccessor: RawCryptoRatesAccessor){}
    @Cron('*/2 * * * *')
    async handleCron() {
        this.logger.debug('Fetch crypto-rates every 2 minutes');
        const rateResult: CryptoRateDto[] = await this.cryptoRatesFetcherAccessor.fetchCryptoRates();
        this.rawCryptoRatesAccessor.setCryptoRates(rateResult);
    } 
}
