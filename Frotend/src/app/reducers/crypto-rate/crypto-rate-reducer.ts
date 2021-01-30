import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AvgRateDto } from "src/app/crypto-rates/Dtos/Avg-rate-dto";
import { CryptoRateDto } from "src/app/crypto-rates/Dtos/crypto-rate-dto";
import { CryptoRatesActions, CryptoRatesActionTypes } from "./crypto-rate-actions";

export interface State {
    currentCryptoRates: CryptoRateDto[];
    avgCryptoRates: AvgRateDto[];
    cryptoRatesotalCount: number;
}

export const initialState: State = {
    currentCryptoRates: [],
    avgCryptoRates: [],
    cryptoRatesotalCount: 0
}

const getFeatureState = createFeatureSelector<State>('cryptoRates');

export const currentCryptoRates = createSelector(
    getFeatureState,
    state => state ? state.currentCryptoRates : []
);

export const avgCryptoRates = createSelector(
    getFeatureState,
    state => state ? state.avgCryptoRates : []
);

export const cryptoRatesotalCount = createSelector(
    getFeatureState,
    state => state ? state.cryptoRatesotalCount : 0
);

export function reducer(state = initialState, action: CryptoRatesActions): State {
    switch(action.type){
        case CryptoRatesActionTypes.GetCryptoRatesSuccess: {
            return {...state, currentCryptoRates: action.payload}
        }
        case CryptoRatesActionTypes.GetAvgCryptoRatesSuccess: {
            return {...state, avgCryptoRates: action.payload}
        }
        case CryptoRatesActionTypes.GetRatesTotalCountSuccess: {
            return {...state, cryptoRatesotalCount: action.payload}
        }
        default: {
            return state;
          } 
    }
}


