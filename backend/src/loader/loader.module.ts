import { Module } from '@nestjs/common';
import { loadersFactoryProvider } from './loaders.provider.js';
import { LOADERS_FACTORY } from './loader.constants.js';
import { TaskModule } from '../task/index.js';
import { BoardModule } from '../board/index.js';

@Module({
  providers: [loadersFactoryProvider],
  exports: [LOADERS_FACTORY],
  imports: [TaskModule, BoardModule],
})
export class LoaderModule {}
