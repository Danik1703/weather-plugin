import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseCityComponent } from './choose-city/choose-city.component';
import { OutputWeatherComponent } from './output-weather/output-weather.component';

const routes: Routes = [
  { path: 'choose-city', redirectTo: 'choose-city', pathMatch: 'full' },
  { path: 'choose-city', component: ChooseCityComponent },
  { path: 'output-weather', component: OutputWeatherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
