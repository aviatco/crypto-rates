import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { HistoricalRatesRequestParams } from 'src/crypto-rate/dtos/historical-rates-request-params';
import { Repository } from 'typeorm';
import { CryptoRate } from '../../entities/crypto-rate/crypto-rate.entity';

@Injectable()
export class CryptoRateService {
    private readonly logger = new Logger(CryptoRateService.name);

    constructor(@InjectRepository(CryptoRate) private cryptoRateRepository: Repository<CryptoRate>){}

    public async getHistoricalRates(params: HistoricalRatesRequestParams): Promise<CryptoRate[]>{
        this.logger.log('Get Historical Rates');
        try{
            return await this.cryptoRateRepository.find({
                order: {["id"]: -1},
                take: 10,
                skip: params && params.skip ? params.skip*10 : 0
            });    
        }catch(err){
            this.logger.log('Get Historical Rates finished with an error', err);
            throw new Error(err);
        }
    }

    public async saveRates(cryptoRates: CryptoRate[]): Promise<CryptoRate[]>{
        this.logger.log('Save Rates');
        try{
            return await this.cryptoRateRepository.save(cryptoRates);
        }catch(err){
            this.logger.log('Could not Save Rates', err);
            throw new Error(err);
        }
    }

    public async getTotalRateCount():  Promise<number>{
        try{
            const res = await this.cryptoRateRepository.count();
            return res;
        }catch(err){
            this.logger.log('Could not get total rates count', err);
            throw new Error(err);
        }
        
    }
}
