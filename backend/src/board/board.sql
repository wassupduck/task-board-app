/* @name selectBoardsByUserId */
select *
from board
where app_user_id = :userId!
order by name asc;

/* @name selectForUpdateBoardByIdAsUser */
select *
from board
where id = :id!
and app_user_id = :userId!
for update;

/* @name selectBoardByIdAsUser */
select *
from board
where id = :id!
and app_user_id = :userId!;

/* @name selectBoardColumnsConnection */
select
    board.id as "board_id!",
    count(board_column.id)::integer as "total_count!"
from board
left join board_column on board_column.board_id = board.id
where board.id = :boardId!
group by board.id;

/* @name selectForUpdateBoardColumnByIdAsUser */
select board_column.*
from board_column
inner join board on board.id = board_column.board_id
where board_column.id = :id!
and board.app_user_id = :userId!
for update;

/* @name selectBoardColumnsByBoardId */
select *
from board_column
where board_id = :boardId!
order by position asc;

/*
    @name selectBoardColumnsByIds
    @param ids -> (...)
*/
select *
from board_column
where id in :ids!;

/* 
    @name selectForUpdateBoardColumnsByIds
    @param ids -> (...)
*/
select *
from board_column
where id in :ids!
for update;

/*
    @name selectBoardColumnTasksConnections
    @param boardColumnIds -> (...)
*/
select
    board_column.id as "board_column_id!",
    count(task.id)::integer as "total_count!"
from board_column
left join task on task.board_column_id = board_column.id
where board_column.id in :boardColumnIds!
group by board_column.id;

/*
    @name insertBoard
    @param board -> (name, appUserId)
*/
insert into board(name, app_user_id)
values :board!
returning *;

/*
    @name insertBoards
    @param boards -> ((id!, name!, appUserId!)...)
*/
insert into board(id, name, app_user_id)
values :boards!
returning *;

/* @name updateBoard */
update board set
    name = coalesce(:name, name)
where id = :id!
returning *;

/* 
    @name deleteBoardColumns
    @param columnIds -> (...)
*/
delete from board_column
where id in :columnIds!
and board_id = :boardId!;

/*
    @name insertBoardColumns
    @param columns -> ((id!, name!, position!, boardId!)...)
*/
insert into board_column(id, name, position, board_id)
values :columns!
returning *;

/* 
    @name updateBoardColumns
    @param columns -> ((id!, name, position)...)
*/
update board_column
set
    name = coalesce(column_update.name, board_column.name),
    position = coalesce(column_update.position::smallint, board_column.position)
from (values :columns!) as column_update(id, name, position)
where board_column.id = column_update.id::uuid
and board_column.board_id = :boardId!
returning board_column.*;

/* @name deleteBoardAsUser */
delete from board
where id = :id!
and app_user_id = :userId!
returning *;
