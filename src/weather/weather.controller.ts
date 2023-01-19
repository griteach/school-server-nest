import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('weather')
export class WeatherController {
  @Get()
  getAll() {
    return 'This will return all weather';
  }

  @Get('/search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie with ${searchingYear}`;
  }
  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `This will return one weather with id: ${id}`;
  }

  @Post()
  create(@Body() data) {
    return data;
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return `This will delete a movie with id : ${id}`;
  }

  //전체를 업데이트 할 때는 Put
  //부분을 업데이트 할 때는 Patch
  @Patch('/:id')
  patch(@Param('id') id: string, @Body() updateData) {
    return {
      updateData: id,
      ...updateData,
    };
  }
}
