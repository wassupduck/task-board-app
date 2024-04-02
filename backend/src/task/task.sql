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
    count(subtask.task_id)::integer AS "total_count!",
    (count(subtask.task_id) FILTER (WHERE subtask.completed IS true))::integer AS "completed_count!"
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
WHERE task_id IN :taskIds!;
