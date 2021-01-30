import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { CryptoRateService } from 'src/crypto-rate/repositories/crypto-rate-repo/crypto-rate.service';
import { CryptoAvgRate } from 'src/crypto-rate/entities/crypto-avg-rate/crypto-avg-rate.entity';
import { CryptoRate } from 'src/crypto-rate/entities/crypto-rate/crypto-rate.entity';
import { CryptoAvgRateService } from './repositories/crypto-avg-rate-repo/crypto-avg-rate.service';

@Module({
    imports: [TypeOrmModule.forFeature([CryptoRate, CryptoAvgRate])],
    controllers: [],
    providers: [CryptoRateService, CryptoAvgRateService],
    exports: [TypeOrmModule]
})
export class CryptoRateModule {}
