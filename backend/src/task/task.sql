/* @name selectTaskByIdForUser */
SELECT task.*
FROM task
INNER JOIN board_column ON board_column.id = task.board_column_id
INNER JOIN board ON board.id = board_column.board_id
WHERE task.id = :id!
AND board.app_user_id = :userId!;

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

/*
    @name selectSubtasksConnectionsByTaskIds
    @param taskIds -> (...)
*/
SELECT
    task.id AS task_id,
    count(subtask.id)::integer AS "total_count!",
    (count(subtask.id) FILTER (WHERE subtask.completed IS true))::integer AS "completed_count!"
FROM task
LEFT JOIN subtask ON subtask.task_id = task.id
WHERE task.id IN :taskIds!
GROUP BY task.id;

/*
    @name selectSubtasksByTaskIds
    @param taskIds -> (...)
*/
SELECT *
FROM subtask
WHERE task_id IN :taskIds!
ORDER BY task_id, created_at, id;

/* @name updateSubtaskCompletedByIdForUser */
UPDATE subtask
SET completed = :completed!
WHERE id = (
    SELECT subtask.id
    FROM subtask
    INNER JOIN task ON task.id = subtask.task_id
    INNER JOIN board_column ON board_column.id = task.board_column_id
    INNER JOIN board ON board.id = board_column.board_id
    WHERE subtask.id = :id!
    AND board.app_user_id = :userId!
)
RETURNING *;

/* 
    @name insertTask
    @param task -> (title!, description!, boardColumnId!)
*/
INSERT INTO task(title, description, board_column_id)
VALUES :task
RETURNING *;

/* @name updateTask */
UPDATE task SET
    title = COALESCE(:title, title),
    description = COALESCE(:description, description),
    board_column_id = COALESCE(:boardColumnId, board_column_id)
WHERE id = :id!
RETURNING *;
