/* @name selectAllBoardsForUser */
SELECT *
FROM board
WHERE app_user_id = :userId!
ORDER BY name ASC;

/* @name selectForUpdateBoardByIdForUser */
SELECT *
FROM board
WHERE id = :id!
AND app_user_id = :userId!
FOR UPDATE;

/* @name selectBoardByIdForUser */
SELECT *
FROM board
WHERE id = :id!
AND app_user_id = :userId!;

/* @name selectBoardColumnByIdForUser */
SELECT board_column.*
FROM board_column
INNER JOIN board ON board.id = board_column.board_id
WHERE board_column.id = :id!
AND board.app_user_id = :userId!;

/* @name selectBoardColumnsByBoardId */
SELECT *
FROM board_column
WHERE board_id = :boardId!
ORDER BY position ASC;

/*
    @name selectBoardColumnsByIds
    @param ids -> (...)
*/
SELECT *
FROM board_column
WHERE id in :ids!;

/* @name selectBoardColumnsConnection */
SELECT
    board.id AS "board_id!",
    count(board_column.id)::integer AS "total_count!"
FROM board
LEFT JOIN board_column ON board_column.board_id = board.id
WHERE board.id = :boardId!
GROUP BY board.id;

/*
    @name insertBoard 
    @param board -> (name, userId)
*/
INSERT INTO board(name, app_user_id)
VALUES :board!
RETURNING *;

/* @name updateBoard */
UPDATE board SET
    name = COALESCE(:name, name)
WHERE id = :id!
RETURNING *;

/* 
    @name deleteBoardColumns
    @param columnIds -> (...)
*/
DELETE FROM board_column
WHERE id IN :columnIds
AND board_id = :boardId!;

/*
    @name insertBoardColumns
    @param columns -> ((idAlias, name!, position!, boardId!)...)
*/
WITH
new_column_data AS (
    SELECT
        id_alias,
        name,
        position::smallint,
        board_id::bigint,
        nextval('board_column_id_seq'::regclass) AS id
    FROM (VALUES :columns!) AS c (id_alias, name, position, board_id)
),
new_column AS (
    INSERT INTO board_column(id, name, position, board_id)
    SELECT id, name, position, board_id
    FROM new_column_data
    RETURNING *
)
SELECT
    new_column.*,
    new_column_data.id_alias
FROM new_column
INNER JOIN new_column_data ON new_column_data.id = new_column.id
ORDER BY new_column.position ASC;


/* 
    @name updateBoardColumns
    @param columns -> ((id!, name, position)...)
*/
UPDATE board_column
SET
    name = COALESCE(column_update.name, board_column.name),
    position = COALESCE(column_update.position::smallint, board_column.position)
FROM (VALUES :columns!) AS column_update(id, name, position)
WHERE board_column.id = column_update.id::bigint
AND board_column.board_id = :boardId!
RETURNING board_column.*;
