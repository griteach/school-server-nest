import { Test, TestingModule } from '@nestjs/testing';
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
});
