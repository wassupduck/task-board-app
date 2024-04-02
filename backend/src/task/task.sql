/* @name selectTasksByBoardId */
SELECT task.*
FROM task
INNER JOIN board_column ON board_column.id = task.board_column_id
WHERE board_column.board_id = :boardId!;

/* 
    @name selectTasksByColumnIds
    @param columnIds -> (...)
*/
SELECT *
FROM task
WHERE task.board_column_id IN :columnIds!;
