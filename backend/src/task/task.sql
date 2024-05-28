/* @name selectTaskByIdAsUser */
select task.*
from task
inner join board_column on board_column.id = task.board_column_id
inner join board on board.id = board_column.board_id
where task.id = :id!
and board.app_user_id = :userId!;

/*
    @name selectTasksByColumnIds
    @param columnIds -> (...)
*/
select *
from task
where board_column_id in :columnIds!
order by board_column_id, position asc;

/* @name selectTasksSurroundingBoardColumnPosition */
select *
from ((
    select *
    from task
    where board_column_id = :boardColumnId!
    and position <= :position!
    order by position desc
    limit 1
) union (
    select *
    from task
    where board_column_id = :boardColumnId!
    and position > :position!
    order by position asc
    limit 1
))
order by position asc;

/* @name selectLastTaskInBoardColumn */
select *
from task
where board_column_id = :boardColumnId!
order by position desc
limit 1;

/*
    @name insertTask
    @param task -> (title!, description!, boardColumnId!, position!)
*/
insert into task(title, description, board_column_id, position)
values :task
returning *;

/* @name updateTask */
update task set
    title = coalesce(:title, title),
    description = coalesce(:description, description),
    board_column_id = coalesce(:boardColumnId, board_column_id),
    position = coalesce(:position, position)
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

/*
    @name updateTaskSubtasks
    @param subtasks -> ((id!, title, completed)...)
*/
update subtask
set
    title = coalesce(subtask_update.title, subtask.title),
    completed = coalesce(subtask_update.completed::boolean, subtask.completed)
from (values :subtasks!) as subtask_update(id, title, completed)
where subtask.id = subtask_update.id::bigint
and subtask.task_id = :taskId!
returning subtask.*;

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

/* 
    @name deleteTaskSubtasks
    @param subtaskIds -> (...)
*/
delete from subtask
where id in :subtaskIds!
and task_id = :taskId!
returning *;
