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
