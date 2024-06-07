import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loaders } from '../loader/index.js';
import { BoardColumnsConnection } from './entities/board-columns-connection.entity.js';
import { BoardColumn } from './entities/board-column.entity.js';
import { BoardService } from './board.service.js';

@Resolver(BoardColumnsConnection)
export class BoardColumnsConnectionResolver {
  constructor(private readonly boardService: BoardService) {}

  @ResolveField(() => [BoardColumn])
  async nodes(
    @Parent() { boardId }: BoardColumnsConnection,
    @Context('loaders') { boardLoaders }: Loaders,
  ): Promise<BoardColumn[]> {
    const columns = await this.boardService.getBoardColumnsByBoardId(boardId);
    columns.forEach((column) =>
      boardLoaders.boardColumnByIdLoader.prime(column.id, column),
    );
    return columns;
  }
}
