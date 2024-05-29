create table if not exists task (
  id              uuid primary key default gen_random_uuid(),
  title           varchar not null,
  description     varchar not null default '',
  board_column_id uuid not null references board_column(id) on delete cascade,
  position        varchar not null,
  created_at      timestamptz not null default current_timestamp,
  updated_at      timestamptz not null default current_timestamp,
  constraint nonempty_title check (title <> '')
);

create unique index if not exists task_board_column_id_position_idx on task(board_column_id, position);

create or replace trigger task_set_updated_at_trigger
before update on task
for each row
execute procedure set_updated_at();
