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
    @name selectLastTaskInBoardColumns 
    @param boardColumnIds -> (...)
*/
select *
from (
    select
        *,
        row_number() over (
            partition by board_column_id 
            order by position desc
        ) as rn
    from task
    where board_column_id in :boardColumnIds!
) as t
where rn = 1;

/*
    @name insertTask
    @param task -> (title!, description!, boardColumnId!, position!)
*/
insert into task(title, description, board_column_id, position)
values :task!
returning *;

/*
    @name insertTasks
    @param tasks -> ((id!, title!, description!, boardColumnId!, position!)...)
    @param returnOrder -> ((id!, idx!)...)
*/
with
new_task as (
    insert into task(id, title, description, board_column_id, position)
    values :tasks!
    returning *
)
select new_task.*
from new_task
left join (
    select
        id::uuid,
        idx::smallint
    from (values :returnOrder!) as ro (id, idx)
) as "order" on "order".id = new_task.id
order by "order".idx asc nulls last;

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
    @name selectTaskSubtasksConnections
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
order by task_id, position;

/* 
    @name insertSubtasks
    @param subtasks -> ((title!, taskId!, completed!, position!)...)
*/
insert into subtask(title, task_id, completed, position)
values :subtasks!
returning *;

/*
    @name appendSubtasks
    @param subtasks -> ((title!, completed!, _idx!)...)
*/
insert into subtask(title, completed, task_id, position)
select
    title,
    completed::boolean,
    :taskId!,
    "offset" + _idx::smallint
from (values :subtasks!) as c (title, completed, _idx)
cross join (
    select coalesce(max(position), -1) + 1 as "offset"
    from subtask
    where task_id = :taskId!
)
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
where subtask.id = subtask_update.id::uuid
and subtask.task_id = :taskId!
returning subtask.*;

/* @name updateSubtaskCompletedAsUser */
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
