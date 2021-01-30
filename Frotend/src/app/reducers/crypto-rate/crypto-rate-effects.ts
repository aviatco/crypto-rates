import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AvgRateDto } from "src/app/crypto-rates/Dtos/Avg-rate-dto";
import { CryptoRateDto } from "src/app/crypto-rates/Dtos/crypto-rate-dto";
import { CryptoRatesService } from "src/app/crypto-rates/services/crypto-rates.service";
import * as CryptoRatesActions from "./crypto-rate-actions";

@Injectable()
export class CryptoRatesEffects {
    constructor(private actions$: Actions, private cryptoRatesService: CryptoRatesService){}

    @Effect()
    getCurrentCryptoRate$: Observable<Action> = this.actions$.pipe(
        ofType(CryptoRatesActions.CryptoRatesActionTypes.GetCryptoRates),
        mergeMap((action: CryptoRatesActions.GetCryptoRates) => 
        this.cryptoRatesService.getHistoricalRateGrid(action.payload).pipe(
            map((rates: CryptoRateDto[]) => { return new CryptoRatesActions.GetCryptoRatesSuccess(rates)}),
            catchError((err) => 
                of(new CryptoRatesActions.GetCryptoRatesFail(err))
                )
        ))
    );

    @Effect()
    getAvgCryptoRate$: Observable<Action> = this.actions$.pipe(
        ofType(CryptoRatesActions.CryptoRatesActionTypes.GetAvgCryptoRates),
        mergeMap((action: CryptoRatesActions.GetAvgCryptoRates) => 
        this.cryptoRatesService.getAvgRates().pipe(
            map((avgRates: AvgRateDto[]) => { 
                return new CryptoRatesActions.GetAvgCryptoRatesSuccess(avgRates)
            }),
            catchError((err) => 
                of(new CryptoRatesActions.GetAvgCryptoRatesFail(err))
                )
        ))
    );

    @Effect()
    getTotalRatesCount$: Observable<Action> = this.actions$.pipe(
        ofType(CryptoRatesActions.CryptoRatesActionTypes.GetRatesTotalCount),
        mergeMap((action: CryptoRatesActions.GetRatesTotalCount) => {
        return this.cryptoRatesService.getTotalRateCount().pipe(
            map((count: number) => { return new CryptoRatesActions.GetRatesTotalCountSuccess(count)}),
            catchError((err) => 
                of(new CryptoRatesActions.GetRatesTotalCountFail(err))
                )
        )})
    );
}