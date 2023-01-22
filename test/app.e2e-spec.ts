import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('This is NEST JS HOME.');
  });

  describe('/movie', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movie').expect(200).expect([]);
    });
    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movie')
        .send({
          title: 'jaden',
          year: 2017,
          genres: ['test'],
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movie')
        .send({
          title: 'jaden',
          year: 2017,
          genres: ['test'],
          other: 'thing',
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movie').expect(404);
    });
  });
  describe('/movie/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movie/1').expect(200);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movie/1')
        .send({ title: 'Yehwan' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movie/1').expect(200);
    });
  });
});
