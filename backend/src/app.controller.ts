import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root(): string {
    return (
      'Task Board App API' +
      (process.env.BACKEND_VERSION ? ` (${process.env.BACKEND_VERSION})` : '')
    );
  }
}
