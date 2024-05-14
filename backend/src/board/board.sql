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

/* @name selectBoardColumnByIdAsUser */
select board_column.*
from board_column
inner join board on board.id = board_column.board_id
where board_column.id = :id!
and board.app_user_id = :userId!;

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

/* @name selectBoardColumnsConnection */
select
    board.id as "board_id!",
    count(board_column.id)::integer as "total_count!"
from board
left join board_column on board_column.board_id = board.id
where board.id = :boardId!
group by board.id;

/*
    @name insertBoard
    @param board -> (name, appUserId)
*/
insert into board(name, app_user_id)
values :board!
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
    @param columns -> ((idAlias, name!, position!, boardId!)...)
*/
with
new_column_data as (
    select
        id_alias,
        name,
        position::smallint,
        board_id::bigint,
        nextval('board_column_id_seq'::regclass) as id
    from (values :columns!) as c (id_alias, name, position, board_id)
),
new_column as (
    insert into board_column(id, name, position, board_id)
    select id, name, position, board_id
    from new_column_data
    returning *
)
select
    new_column.*,
    new_column_data.id_alias
from new_column
inner join new_column_data on new_column_data.id = new_column.id
order by new_column.position asc;

/* 
    @name updateBoardColumns
    @param columns -> ((id!, name, position)...)
*/
update board_column
set
    name = coalesce(column_update.name, board_column.name),
    position = coalesce(column_update.position::smallint, board_column.position)
from (values :columns!) as column_update(id, name, position)
where board_column.id = column_update.id::bigint
and board_column.board_id = :boardId!
returning board_column.*;

/* @name deleteBoardAsUser */
delete from board
where id = :id!
and app_user_id = :userId!
returning *;
