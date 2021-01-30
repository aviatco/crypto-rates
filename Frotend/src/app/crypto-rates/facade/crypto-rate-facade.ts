import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AvgRateDto } from '../Dtos/Avg-rate-dto';
import { CryptoRateDto } from '../Dtos/crypto-rate-dto';
import { CryptoRatesService } from '../services/crypto-rates.service';
import * as appStore from "../../reducers/index";
import { Store } from '@ngrx/store';
import * as fromCryptoRatesStore from '../../reducers/crypto-rate/crypto-rate-reducer';
import * as CryptoRateAcrions from '../../reducers/crypto-rate/crypto-rate-actions';

@Injectable({
    providedIn: "root",
  })
  export class CryptoRateFacade {
    currentCryptoRates$: Observable<CryptoRateDto[]> = this.store.select(
      fromCryptoRatesStore.currentCryptoRates
    );
    avgCryptoRates$: Observable<AvgRateDto[]> = this.store.select(
      fromCryptoRatesStore.avgCryptoRates
    ); 
    cryproRatesTotalCount$: Observable<number> = this.store.select(
      fromCryptoRatesStore.cryptoRatesotalCount
    );

    constructor(private store: Store<appStore.State>){}



    public getHistoricalRates(skip: number): void{
      this.store.dispatch(new CryptoRateAcrions.GetCryptoRates(skip));
    }

    public getAvgRates(): void{
      this.store.dispatch(new CryptoRateAcrions.GetAvgCryptoRates());
    }

    public getTotalRateCount(): void {
      this.store.dispatch(new CryptoRateAcrions.GetRatesTotalCount());
    }
  }