import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, take } from "rxjs/operators";
import { AvgRateDto } from '../Dtos/Avg-rate-dto';
import { CryptoRateDto } from '../Dtos/crypto-rate-dto';

@Injectable({
  providedIn: 'root'
})
export class CryptoRatesService {

  baseUrl: string = 'http://localhost:6009/api/cryptoRate';
  constructor(private http: HttpClient) { }

  getAvgRates(): Observable<AvgRateDto[]> {
    const url = `${this.baseUrl}/avg`;
    const config = new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    return this.http
    .get(url, {headers: config})
    .pipe(
      catchError(err => {
          console.log('Error in getAvgRates', err); 
          return of(null)
          })
    )
  }

  getHistoricalRateGrid(skip: number): Observable<CryptoRateDto[]> {
    const url = `${this.baseUrl}/historical`;
    const params = new HttpParams().set("skip", skip.toString());
    return this.http
    .get(url, {params: params})
    .pipe(
      catchError(err => {
          console.log('Error in getHistoricalRateGrid', err); 
          return of(null)
          })
    )
  } 

  getTotalRateCount(): Observable<number> {
    const url = `${this.baseUrl}/rate-count`;
    return this.http
    .get(url)
    .pipe(
      map(res => res as number),
      catchError(err => {
          console.log('Error in getTotalRateCount', err); 
          return of(null)
          })
    );
  }
}
