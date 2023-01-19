import { Module } from '@nestjs/common';
import { WeatherController } from './weather/weather.controller';

@Module({
  imports: [],
  controllers: [WeatherController],
  providers: [],
})
export class AppModule {}
