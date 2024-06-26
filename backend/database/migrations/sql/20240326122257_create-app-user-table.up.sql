create table if not exists app_user (
  id            uuid primary key default gen_random_uuid(),
  username      varchar not null,
  password_hash varchar not null,
  created_at    timestamptz not null default current_timestamp,
  updated_at    timestamptz not null default current_timestamp
);

create unique index if not exists app_user_username_unique_idx on app_user(username);

create or replace trigger app_user_set_updated_at_trigger
before update on app_user
for each row
execute procedure set_updated_at();
