create table if not exists subtask (
  id          bigint primary key generated by default as identity,
  title       varchar not null,
  completed   boolean not null default false,
  task_id     bigint not null references task(id),
  created_at  timestamptz not null default current_timestamp,
  updated_at  timestamptz not null default current_timestamp
);

create trigger subtask_set_updated_at_trigger
before update on subtask
for each row
execute procedure set_updated_at();
