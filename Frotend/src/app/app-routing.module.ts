import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoricalRatesComponent } from './crypto-rates/historical-rates/historical-rates.component';


const routes: Routes = [
  {path: "cryproRate", component: HistoricalRatesComponent},
  { path: "", redirectTo: "/cryproRate", pathMatch: "full" },
  { path: "**", component: HistoricalRatesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
