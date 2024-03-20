/* @name selectCurrentMigrationVersion */
SELECT SPLIT_PART(name, '_', 1) as "current_version!"
FROM knex_migrations
ORDER BY migration_time DESC
LIMIT 1;
