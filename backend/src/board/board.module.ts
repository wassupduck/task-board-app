import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver.js';
import { BoardService } from './board.service.js';
import { BoardRepository } from './board.repository.js';

@Module({
  providers: [BoardResolver, BoardService, BoardRepository],
})
export class BoardModule {}
