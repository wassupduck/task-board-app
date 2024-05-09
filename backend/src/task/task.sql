/* @name selectTaskByIdAsUser */
select task.*
from task
inner join board_column on board_column.id = task.board_column_id
inner join board on board.id = board_column.board_id
where task.id = :id!
and board.app_user_id = :userId!;

/* @name selectTasksByBoardId */
select task.*
from task
inner join board_column on board_column.id = task.board_column_id
where board_column.board_id = :boardId!;

/*
    @name selectTasksByColumnIds
    @param columnIds -> (...)
*/
select *
from task
where task.board_column_id in :columnIds!;

/*
    @name insertTask
    @param task -> (title!, description!, boardColumnId!)
*/
insert into task(title, description, board_column_id)
values :task
returning *;

/* @name updateTask */
update task set
    title = coalesce(:title, title),
    description = coalesce(:description, description),
    board_column_id = coalesce(:boardColumnId, board_column_id)
where id = :id!
returning *;

/* @name deleteTaskAsUser */
delete from task
where id = (
    select task.id
    from task
    inner join board_column on board_column.id = task.board_column_id
    inner join board on board.id = board_column.board_id
    where task.id = :id!
    and board.app_user_id = :userId!
)
returning *;

/*
    @name selectSubtasksConnectionsByTaskIds
    @param taskIds -> (...)
*/
select
    task.id as task_id,
    count(subtask.id)::integer as "total_count!",
    (count(subtask.id) filter (where subtask.completed is true))::integer as "completed_count!"
from task
left join subtask on subtask.task_id = task.id
where task.id in :taskIds!
group by task.id;

/*
    @name selectSubtasksByTaskIds
    @param taskIds -> (...)
*/
select *
from subtask
where task_id in :taskIds!
order by task_id, created_at, id;

/* 
    @name insertSubtasks
    @param subtasks -> ((title!, taskId!)...)
*/
insert into subtask(title, task_id)
values :subtasks!
returning *;

/* @name updateSubtaskCompletedByIdAsUser */
update subtask
set completed = :completed!
where id = (
    select subtask.id
    from subtask
    inner join task on task.id = subtask.task_id
    inner join board_column on board_column.id = task.board_column_id
    inner join board on board.id = board_column.board_id
    where subtask.id = :id!
    and board.app_user_id = :userId!
)
returning *;
