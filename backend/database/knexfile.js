import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Signer } from '@aws-sdk/rds-signer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbCACertFile = path.join(__dirname, '/rds-ca-cert.eu-west-2-bundle.pem');

const connection = {
  connectionString: process.env.TASK_BOARD_APP_DATABASE_CONNECTION_STRING,
  user: process.env.TASK_BOARD_APP_DATABASE_USER ?? 'postgres',
  database: process.env.TASK_BOARD_APP_DATABASE_NAME ?? 'task_board_app',
  password: process.env.TASK_BOARD_APP_DATABASE_PASSWORD ?? 'postgres',
  port: Number(process.env.TASK_BOARD_APP_DATABASE_PORT ?? '5432'),
  host: process.env.TASK_BOARD_APP_DATABASE_HOST ?? 'localhost',
  ssl:
    process.env.NODE_ENV !== 'production'
      ? false
      : { ca: readFileSync(dbCACertFile).toString() },
};

const config = {
  development: {
    client: 'pg',
    connection: connection,
    migrations: {
      tableName: 'knex_migrations',
      stub: 'migration.stub.js',
    },
  },
  production: {
    client: 'pg',
    connection: () => {
      const rdsSigner = new Signer({
        hostname: connection.host,
        port: connection.port,
        username: connection.user,
      });
      return {
        ...connection,
        password: () => rdsSigner.getAuthToken(),
      };
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default config;
