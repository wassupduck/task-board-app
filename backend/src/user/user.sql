/* @name selectUserById */
select *
from app_user
where id = :id!;

/* @name selectUserByUsername */
select *
from app_user
where username = :username!;

/* 
  @name insertUser
  @param user -> (username!, passwordHash!)
*/
insert into app_user(username, password_hash)
values :user
returning *;
