import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherData } from '../weather-data.model';

@Component({
  selector: 'app-choose-city',
  templateUrl: './choose-city.component.html',
  styleUrls: ['./choose-city.component.css']
})
export class ChooseCityComponent {
  cityName: string = '';
  weatherData: WeatherData | null = null;
  errorMessage: string = '';
  view: string = 'today'; // 'today' or '5days'

  constructor(private weatherService: WeatherService) {}

  searchWeather() {
    if (this.cityName.trim() === '') {
      this.errorMessage = 'Введите название города';
      return;
    }
    this.errorMessage = '';

    if (this.view === 'today') {
      this.getCurrentWeather();
    } else {
      this.getWeatherForecast();
    }
  }

  getCurrentWeather() {
    this.weatherService.getCurrentWeather(this.cityName)
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
    this.weatherService.getWeatherForecast(this.cityName)
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

  getWeatherInMyCity() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.weatherService.getWeatherByCoordinates(latitude, longitude)
          .subscribe(
            (data: WeatherData) => {
              this.weatherData = data;
              this.errorMessage = '';
            },
            (error: any) => {
              this.errorMessage = 'Не удалось получить информацию о погоде для вашего местоположения';
              console.error(error);
            }
          );
      });
    } else {
      this.errorMessage = 'Геолокация не поддерживается этим браузером.';
    }
  }
}
