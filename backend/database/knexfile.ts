import { type Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      connectionString: process.env.TASK_BOARD_APP_DATABASE_CONNECTION_STRING,
      host: 'localhost',
      port: 5432,
      database: 'task_board_app',
      user: 'postgres',
      password: 'postgres',
    },
    migrations: {
      tableName: 'knex_migrations',
      stub: 'migration.stub.ts',
      extension: 'ts',
    },
  },
};

export default config;
