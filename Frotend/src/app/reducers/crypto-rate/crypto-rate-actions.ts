import { Action } from "@ngrx/store";
import { AvgRateDto } from "src/app/crypto-rates/Dtos/Avg-rate-dto";
import { CryptoRateDto } from "src/app/crypto-rates/Dtos/crypto-rate-dto";

export enum CryptoRatesActionTypes {
    GetCryptoRates = "[CryptoRates] Get Crypto Rates",
    GetCryptoRatesSuccess = "[CryptoRates] Get Crypto Rates Success",
    GetCryptoRatesFail = "[CryptoRates] Get Crypto Rates Fail",
    GetAvgCryptoRates = "[CryptoRates] Get Avg Crypto Rates",
    GetAvgCryptoRatesSuccess = "[CryptoRates] Get Avg Crypto Rates Success",
    GetAvgCryptoRatesFail = "[CryptoRates] Get Avg Crypto Rates Fail",
    GetRatesTotalCount = '[CryptoRates] Get CryptoRates total count',
    GetRatesTotalCountSuccess = '[CryptoRates]  Get CryptoRates total count Success',
    GetRatesTotalCountFail = '[CryptoRates]  Get CryptoRates total count Fail',
  }

  export class GetCryptoRates implements Action {
      readonly type = CryptoRatesActionTypes.GetCryptoRates;
      constructor(public payload: number){};
  }

  export class GetCryptoRatesSuccess implements Action {
    readonly type = CryptoRatesActionTypes.GetCryptoRatesSuccess;
    constructor(public payload: CryptoRateDto[]){};
  }

  export class GetCryptoRatesFail implements Action {
    readonly type = CryptoRatesActionTypes.GetCryptoRatesFail;
    constructor(public payload: string){};
  }

  export class GetAvgCryptoRates implements Action {
    readonly type = CryptoRatesActionTypes.GetAvgCryptoRates;
    constructor(){};
  }  
  export class GetAvgCryptoRatesSuccess implements Action {
    readonly type = CryptoRatesActionTypes.GetAvgCryptoRatesSuccess;
    constructor(public payload: AvgRateDto[]){};
  }  
  export class GetAvgCryptoRatesFail implements Action {
    readonly type = CryptoRatesActionTypes.GetAvgCryptoRatesFail;
    constructor(public payload: string){};
  }   

  export class GetRatesTotalCount implements Action {
    readonly type = CryptoRatesActionTypes.GetRatesTotalCount;
    constructor(){}
  } 
  export class GetRatesTotalCountSuccess implements Action {
    readonly type = CryptoRatesActionTypes.GetRatesTotalCountSuccess;
    constructor(public payload: number){};
  } 

  export class GetRatesTotalCountFail implements Action {
    readonly type = CryptoRatesActionTypes.GetRatesTotalCountFail;
    constructor(public payload: number){};
  } 

  export type CryptoRatesActions = 
            GetCryptoRates | GetCryptoRatesSuccess | GetCryptoRatesFail |
            GetAvgCryptoRates | GetAvgCryptoRatesSuccess | GetAvgCryptoRatesFail |
            GetRatesTotalCount | GetRatesTotalCountSuccess | GetRatesTotalCountFail;
