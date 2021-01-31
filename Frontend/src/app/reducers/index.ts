import { ActionReducerMap } from '@ngrx/store';
import * as fromCryptoRates from './crypto-rate/crypto-rate-reducer';

export interface State {
    cryptoRates: fromCryptoRates.State
}

export const reducers: ActionReducerMap<State> = {
    cryptoRates: fromCryptoRates.reducer
}