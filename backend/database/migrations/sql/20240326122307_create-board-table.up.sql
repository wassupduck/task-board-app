create table if not exists board (
  id          uuid primary key default gen_random_uuid(),
  name        varchar not null,
  app_user_id uuid not null references app_user(id) on delete cascade,
  created_at  timestamptz not null default current_timestamp,
  updated_at  timestamptz not null default current_timestamp,
  constraint nonempty_name check (name <> '')
);

create unique index if not exists board_app_user_id_name_unique_idx on board(app_user_id, name);

create or replace trigger board_set_updated_at_trigger
before update on board
for each row
execute procedure set_updated_at();
