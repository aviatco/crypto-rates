import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoRateModule } from './crypto-rate/crypto-rate.module';
import { CryptoAvgRate } from './crypto-rate/entities/crypto-avg-rate/crypto-avg-rate.entity';
import { CryptoRate } from './crypto-rate/entities/crypto-rate/crypto-rate.entity';
import { CryptoAvgRateService } from './crypto-rate/repositories/crypto-avg-rate-repo/crypto-avg-rate.service';
import { CryptoRateService } from './crypto-rate/repositories/crypto-rate-repo/crypto-rate.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "db",
    "port": 3306,
    "username": "root",
    "password": "password",
    "database": "crypto_rates",
    "entities": [CryptoAvgRate, CryptoRate],
    "synchronize": true
  }),
  CryptoRateModule],
  controllers: [AppController],
  providers: [AppService, CryptoRateService, CryptoAvgRateService]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
