import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from './app.resolver.js';
import { AppService } from './app.service.js';
import { AppRepository } from './app.respository.js';

describe('AppResolver', () => {
  let appResolver: AppResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService, AppRepository, AppResolver],
    })
      .overrideProvider(AppRepository)
      .useValue(null)
      .compile();

    appResolver = app.get<AppResolver>(AppResolver);
  });

  describe('hello', () => {
    it('should return "Hello World!"', () => {
      expect(appResolver.hello()).toBe('Hello World!');
    });
  });
});
