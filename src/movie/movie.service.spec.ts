import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { after } from 'node:test';
import { NotFoundError } from 'rxjs';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      //service를 통해서 getAll에 접근할 수 있다.
      const result = service.getAll();

      //익스펙트 : 기대되는 값,
      //투 비 인스턴스 오브 어레이 = 어레이 인스턴스가 되어야 한다.
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('getOne', () => {
      service.create({
        title: 'Test',
        year: 2022,
        genres: ['humor', 'horor'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test',
        year: 2022,
        genres: ['humor', 'horor'],
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;

      service.create({
        title: 'Test',
        year: 2022,
        genres: ['humor', 'horor'],
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test',
        year: 2022,
        genres: ['humor', 'horor'],
      });
      service.update(1, { title: 'Updated test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(999, { title: 'Updated test' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
