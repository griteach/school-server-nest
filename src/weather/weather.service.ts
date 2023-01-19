import { Injectable, NotFoundException } from '@nestjs/common';

import Movie from './entities/movie.entity';
import Weather from './entities/weather.entity';

@Injectable()
export class WeatherService {
  // Database
  private API_KEY =
    'l72zwz6RqrexXr8a4wslQsw%2Bx0zTGnE5R1sSf26aPRPOQytFjk3AkCOTfssOo1TQ8xQoimJbfkfYL6YZr%2FssIw%3D%3D';
  //미세먼지 기본 패쓰
  private DUST_PATH_BASIC =
    'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc';

  //측정소별 실시간 미세먼지 데이터
  private DUST_URL = '/getCtprvnRltmMesureDnsty';

  private url = `${this.DUST_PATH_BASIC}${this.DUST_URL}?serviceKey=${
    this.API_KEY
  }&numOfRows=100&returnType=json&ver=1.3&sidoName=${encodeURIComponent(
    '강원',
  )}`;
  private movies: Movie[] = [];
  private weathers: Weather[] = [];

  async fetchWeather() {
    const result = await fetch(this.url)
      .then((response) => response.json())
      .then((r) => r.response.body.items)
      .then((result) =>
        result.map((item, index) => ({ id: index + 1, ...item })),
      );
    this.weathers = result;
  }

  getAll() {
    this.fetchWeather();
    return this.weathers;
  }

  getOne(id: string): Weather {
    const weather = this.weathers.find(
      (weather) => weather.id === parseInt(id),
    );
    if (!weather) {
      throw new NotFoundException(`Weather with ID ${id}`);
    }
    return weather;
  }

  deleteOne(id: string) {
    this.getOne(id); //error를 체크해보는거야.
    this.movies = this.movies.filter((movie) => movie.id !== parseInt(id));
  }

  create(weatherData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...weatherData,
    });
  }

  update(id: string, updateData) {
    const weather = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...weather, ...updateData });
  }
}
