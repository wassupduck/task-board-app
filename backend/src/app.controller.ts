import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return (
      'Task Board App API' +
      (process.env.BACKEND_VERSION ? ` (${process.env.BACKEND_VERSION})` : '')
    );
  }

  // TODO: Remove once using database client in feature module
  @Get('migration-version')
  currentMigrationVersion(): Promise<string> {
    return this.appService.currentMigrationVersion();
  }
}
