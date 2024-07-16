import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherData } from '../weather-data.model';
import { Subscription } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-output-weather',
  templateUrl: './output-weather.component.html',
  styleUrls: ['./output-weather.component.css']
})
export class OutputWeatherComponent implements OnInit, OnDestroy, OnChanges {
  @Input() weatherData: WeatherData | null = null;
  @Input() errorMessage: string = '';
  @Input() view: string = 'today'; // 'today' or '5days'

  private weatherSubscription: Subscription | undefined;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['weatherData'] && !changes['weatherData'].firstChange) {
      this.loadData();
    }
  }

  ngOnDestroy() {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }

  loadData() {
    if (this.view === 'today') {
      this.getCurrentWeather();
    } else {
      this.getWeatherForecast();
    }
  }

  getCurrentWeather() {
    if (!this.weatherData?.city?.name) {
      return;
    }
    
    this.weatherService.getCurrentWeather(this.weatherData.city.name)
      .subscribe(
        (data: WeatherData) => {
          this.weatherData = data;
          this.errorMessage = '';
        },
        (error: any) => {
          this.errorMessage = 'Не удалось найти информацию о погоде для указанного города';
          console.error(error);
        }
      );
  }

  getWeatherForecast() {
    if (!this.weatherData?.city?.name) {
      return;
    }

    this.weatherService.getWeatherForecast(this.weatherData.city.name)
      .subscribe(
        (data: WeatherData) => {
          this.weatherData = data;
          this.errorMessage = '';
        },
        (error: any) => {
          this.errorMessage = 'Не удалось найти информацию о погоде для указанного города';
          console.error(error);
        }
      );
  }

  getRealTimeTemperature(kelvinTemp: number | undefined): number {
    if (kelvinTemp === undefined) {
      return 0;
    }
    return kelvinTemp - 273.15;
  }

  getTodayWeather(): any {
    if (!this.weatherData || !this.weatherData.list) {
      return null;
    }
    const today = new Date().toDateString();
    return this.weatherData.list.find(forecast => new Date(forecast.dt_txt.split(' ')[0]).toDateString() === today);
  }

  groupByDate(weatherData: WeatherData | null): { date: Date, forecasts: any[] }[] {
    if (!weatherData || !weatherData.list) {
      return [];
    }

    const groupedByDate: { [key: string]: { date: Date, forecasts: any[] } } = {};

    weatherData.list.forEach(forecast => {
      const date = new Date(forecast.dt_txt.split(' ')[0]);
      const dateString = date.toDateString();

      if (!groupedByDate[dateString]) {
        groupedByDate[dateString] = {
          date: date,
          forecasts: []
        };
      }

      groupedByDate[dateString].forecasts.push(forecast);
    });

    return Object.values(groupedByDate);
  }
}
