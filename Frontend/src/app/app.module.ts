import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {reducers} from './reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HistoricalRatesComponent } from './crypto-rates/historical-rates/historical-rates.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatInputModule, MatListModule, MatPaginatorModule, MatTableModule, MatTabsModule } from '@angular/material';
import { AverageRateComponent } from './crypto-rates/average-rate/average-rate.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CryptoRatesEffects } from './reducers/crypto-rate/crypto-rate-effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShoutboxComponent } from './shoutbox/shoutbox.component';
@NgModule({
  declarations: [
    AppComponent,
    HistoricalRatesComponent,
    AverageRateComponent,
    ShoutboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CryptoRatesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
