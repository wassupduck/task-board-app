import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('AppResolver (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  describe('hello', () => {
    it('should return "Hello World!', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: '{ hello }' })
        .expect(200)
        .then((res) => {
          expect(res.body.data).toEqual({ hello: 'Hello World!' });
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
