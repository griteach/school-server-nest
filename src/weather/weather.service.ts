import { Injectable } from '@nestjs/common';
import Weather from './entities/weather.entity';

@Injectable()
export class WeatherService {
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
  getWeather() {
    this.fetchWeather();
    return this.weathers;
  }
}
