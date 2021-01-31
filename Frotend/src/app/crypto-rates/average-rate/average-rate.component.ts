import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AvgRateDto } from '../Dtos/Avg-rate-dto';
import { CryptoRateFacade } from '../facade/crypto-rate-facade';
const AVG_RATE_SCHEDULER_TIME = 150000;

@Component({
  selector: 'app-average-rate',
  templateUrl: './average-rate.component.html',
  styleUrls: ['./average-rate.component.css']
})
export class AverageRateComponent implements OnInit {

  avgCryptoRates$: Observable<AvgRateDto[]>;
  displayedColumns: string[] = ['symbol', 'currency', 'avgRate', 'timestamp'];
  avgRatesSubscription: Subscription;

  constructor(private cryptoRateFacade: CryptoRateFacade) { }

  ngOnInit() {
    this.avgCryptoRates$=  this.cryptoRateFacade.avgCryptoRates$
    this.cryptoRateFacade.getAvgRates();
    this.getAvgRatesScheduler();
  }

  private getAvgRatesScheduler(){
    setInterval(() => {
      this.cryptoRateFacade.getAvgRates();
    }, AVG_RATE_SCHEDULER_TIME);
  }
}
