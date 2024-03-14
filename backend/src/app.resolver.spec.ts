import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

describe('AppResolver', () => {
  let appResolver: AppResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService, AppResolver],
    }).compile();

    appResolver = app.get<AppResolver>(AppResolver);
  });

  describe('hello', () => {
    it('should return "Hello World!"', () => {
      expect(appResolver.hello()).toBe('Hello World!');
    });
  });
});
