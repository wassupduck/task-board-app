create table if not exists subtask (
  id          uuid primary key default gen_random_uuid(),
  title       varchar not null,
  completed   boolean not null default false,
  task_id     uuid not null references task(id) on delete cascade,
  position    smallint not null,
  created_at  timestamptz not null default current_timestamp,
  updated_at  timestamptz not null default current_timestamp,
  constraint nonempty_title check (title <> '')
);

create unique index if not exists subtask_task_id_title_unique_idx on subtask(task_id, title);
create unique index if not exists subtask_task_id_position_unique_idx on subtask(task_id, position);

create or replace trigger subtask_set_updated_at_trigger
before update on subtask
for each row
execute procedure set_updated_at();
