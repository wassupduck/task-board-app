/* @name selectAllBoardsForUser */
SELECT *
FROM board
WHERE app_user_id = :userId!
ORDER BY name ASC;

/* @name selectBoardByIdForUser */
SELECT *
FROM board
WHERE id = :id!
AND app_user_id = :userId!;

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

/* 
    @name insertBoardColumns
    @param columns -> ((name, position, boardId)...)
*/
INSERT INTO board_column(name, position, board_id)
VALUES :columns!
RETURNING *;
