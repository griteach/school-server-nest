import { Module } from '@nestjs/common';

import { MovieModule } from './movie/movie.module';
import { WeatherModule } from './weather/weather.module';
import { AppController } from './app.controller';

@Module({
  imports: [MovieModule, WeatherModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
