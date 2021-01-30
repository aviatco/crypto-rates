import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { CryptoRateDto } from '../Dtos/crypto-rate-dto';
import { CryptoRateFacade } from '../facade/crypto-rate-facade';
const TOTAL_COUNT_RATE_SCHEDULER_TIME = 60000;

@Component({
  selector: 'app-historical-rates',
  templateUrl: './historical-rates.component.html',
  styleUrls: ['./historical-rates.component.css']
})
export class HistoricalRatesComponent implements OnInit, AfterViewInit {
  currentCryptoRates$: Observable<CryptoRateDto[]>;
  cryproRatesTotalCount$: Observable<number>;
  totalRatesCount: number = 100;
  subscriptions: Subscription = new Subscription();
  paginatorSubscription: Subscription;
  displayedColumns: string[] = ['symbol', 'source', 'currency', 'rate', 'date'];
  @ViewChild(MatPaginator, { read: null, static: false }) paginator: MatPaginator;

  constructor(private cryptoRateFacade: CryptoRateFacade) {
  }

  ngOnInit() {
    this.currentCryptoRates$ = this.cryptoRateFacade.currentCryptoRates$;
    this.cryproRatesTotalCount$ = this.cryptoRateFacade.cryproRatesTotalCount$;
    this.cryptoRateFacade.getHistoricalRates(0)
    this.cryptoRateFacade.getTotalRateCount();
    this.getTotalRatesCountScheduler();
  }

  ngAfterViewInit() {
    this.paginatorSubscription = this.paginator.page
        .pipe(res => res
        )
       
      .subscribe(() => this.cryptoRateFacade.getHistoricalRates(this.paginator.pageIndex));
}

  ngOnDestroy() {
    this.paginatorSubscription.unsubscribe();
  }

  private getTotalRatesCountScheduler(){
    setInterval(() => {
      this.cryptoRateFacade.getTotalRateCount();
    }, TOTAL_COUNT_RATE_SCHEDULER_TIME);
  }
}
