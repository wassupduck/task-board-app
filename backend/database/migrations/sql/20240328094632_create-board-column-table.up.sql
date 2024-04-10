create table if not exists board_column (
  id          bigint primary key generated by default as identity,
  name        varchar not null,
  position    smallint not null,
  board_id    bigint not null references board(id) on delete cascade,
  created_at  timestamptz not null default current_timestamp,
  updated_at  timestamptz not null default current_timestamp,
  constraint nonempty_name check (name <> ''),
  constraint nonnegative_position check (position >= 0)
);

create unique index if not exists board_column_board_id_name_unique_idx on board_column(board_id, name);

create or replace trigger board_column_set_updated_at_trigger
before update on board_column
for each row
execute procedure set_updated_at();
