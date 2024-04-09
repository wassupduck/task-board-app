create table if not exists task (
  id              bigint primary key generated by default as identity,
  title           varchar not null,
  description     varchar not null default '',
  board_column_id bigint not null references board_column(id),
  created_at      timestamptz not null default current_timestamp,
  updated_at      timestamptz not null default current_timestamp
);

create trigger task_set_updated_at_trigger
before update on task
for each row
execute procedure set_updated_at();