/* @name selectAllBoardsForUser */
SELECT *
FROM board
WHERE app_user_id = :userId!
ORDER BY name ASC;
