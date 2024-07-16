export interface WeatherData {
  city: {
    name: string;
    country: string; 
  };
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
  list?: {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
      description: string;
    }[];
  }[];
}
