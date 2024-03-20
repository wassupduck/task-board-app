import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.respository.js';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  currentMigrationVersion(): Promise<string> {
    return this.appRepository.currentMigrationVersion();
  }
}
