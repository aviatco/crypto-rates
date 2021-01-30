import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoAvgRate } from 'src/crypto-rate/entities/crypto-avg-rate/crypto-avg-rate.entity';
import { CryptoRate } from 'src/crypto-rate/entities/crypto-rate/crypto-rate.entity';
import { Repository } from 'typeorm';
import { CryptoRateService } from '../crypto-rate-repo/crypto-rate.service';

@Injectable()
export class CryptoAvgRateService {
    private readonly logger = new Logger(CryptoRateService.name);

    constructor(@InjectRepository(CryptoAvgRate) private cryptoAvgRateRepository: Repository<CryptoAvgRate>){}

    public async getLatestAvgRate(): Promise<CryptoAvgRate[]>{
        try{
            this.logger.log('Get Latest Avg Rate');
            return await this.cryptoAvgRateRepository.find();

        }catch(err) {
            this.logger.error('Get Latest Avg Rate finished with error', err);
            throw new Error(err);
        }
        
    }

    public async saveLatestAvgRate(rateList: CryptoRate[]): Promise<void>{
        this.logger.log('Save Latest Avg Rate');
        const rateHash: {[key: string]: {price: number, count: number}} = {};
        rateList.forEach(rate => {
            const hashKey = `${rate.symbol}_${rate.currency}`;
            if(!rateHash[hashKey]){
                rateHash[hashKey] = {price: 0, count: 0}
            }
            rateHash[hashKey] = {price: rateHash[hashKey].price + rate.rate, count: rateHash[hashKey].count+1};   
        });
        try{
            const avgRate:CryptoAvgRate[] = []; 
            for(let key of Object.keys(rateHash)){
                const tmp = key.split('_');
                avgRate.push({
                    symbol: tmp[0],
                    currency: tmp[1],
                    avg: rateHash[key].price/rateHash[key].count,
                    timestamp: new Date()
                } );
            }
            await this.cryptoAvgRateRepository.save(avgRate);
        }catch(err){
            this.logger.log('Could not Save Latest Avg Rate', err);
            throw new Error(err);
        }
       
    }
}
