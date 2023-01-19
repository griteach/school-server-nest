import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import Movie from './movie.entity';

import { MovieService } from './movie.service';

@Controller('')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/movie')
  getAll() {
    return this.movieService.getAll();
  }

  @Get('/movie/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.movieService.getOne(movieId);
  }

  @Post('/movie')
  create(@Body() movieData: CreateMovieDto) {
    return this.movieService.create(movieData);
  }

  @Delete('/movie/:id')
  remove(@Param('id') movieId: number) {
    return this.movieService.deleteOne(movieId);
  }

  //전체를 업데이트 할 때는 Put
  //부분을 업데이트 할 때는 Patch
  @Patch('/movie/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.movieService.update(movieId, updateData);
  }
}
