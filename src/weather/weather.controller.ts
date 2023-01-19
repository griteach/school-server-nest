import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import Weather from './entities/weather.entity';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getAll() {
    return this.weatherService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Weather {
    return this.weatherService.getOne(id);
  }

  @Post()
  create(@Body() data) {
    return this.weatherService.create(data);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.weatherService.deleteOne(id);
  }

  //전체를 업데이트 할 때는 Put
  //부분을 업데이트 할 때는 Patch
  @Patch('/:id')
  patch(@Param('id') id: string, @Body() updateData) {
    return this.weatherService.update(id, updateData);
  }
}
