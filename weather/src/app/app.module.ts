import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChooseCityComponent } from './choose-city/choose-city.component';
import { OutputWeatherComponent } from './output-weather/output-weather.component';
import { BannerComponent } from './banner/banner.component';

import { MefDevCardModule } from '@natec/mef-dev-ui-kit';

import { WeatherService } from './weather.service';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { environment } from 'src/environments/environment';

function init(http: HttpClient, translate: TranslateService) {
  return () => forkJoin([
    of({}),
    translate.use(localStorage.getItem('language') || 'en')
  ]);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChooseCityComponent,
    OutputWeatherComponent,
    BannerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MefDevCardModule,
    TranslateModule.forRoot()
  ],
  providers: [
    WeatherService,
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [HttpClient, TranslateService],
      multi: true,
    },
    {
      provide: APP_BASE_HREF,
      useFactory: () => PlatformHelper.getAppBasePath()
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
