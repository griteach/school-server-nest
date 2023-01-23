import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  @Get('/weather')
  getAll() {
    return this.weatherService.getWeatherAll();
  }

  @Get('/weather/:station_name')
  getOne(@Param('station_name') station_name: string) {
    return this.weatherService.getWeatherOne(station_name);
  }
}
