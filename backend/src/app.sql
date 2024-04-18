/* @name selectCurrentMigrationVersion */
select split_part(name, '_', 1) as "current_version!"
from knex_migrations
order by migration_time desc
limit 1;
