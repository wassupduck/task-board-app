import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbCACertFile = path.resolve(
  __dirname,
  '../database/rds-ca-cert.eu-west-2-bundle.pem',
);

const config = {
  db: {
    connectionString: process.env.TASK_BOARD_APP_DATABASE_CONNECTION_STRING,
    user: prodEnvVar('TASK_BOARD_APP_DATABASE_USER', 'postgres'),
    database: prodEnvVar('TASK_BOARD_APP_DATABASE_NAME', 'task_board_app'),
    password: process.env.TASK_BOARD_APP_DATABASE_PASSWORD ?? 'postgres',
    port: Number(process.env.TASK_BOARD_APP_DATABASE_PORT ?? '5432'),
    host: prodEnvVar('TASK_BOARD_APP_DATABASE_HOST', 'localhost'),
    ssl:
      process.env.NODE_ENV !== 'production'
        ? false
        : { ca: readFileSync(dbCACertFile).toString() },
  },
};

function prodEnvVar(name: string, devDefault: string): string {
  const value = process.env[name];

  if (value === undefined) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Environment variable: ${name} is not set.`);
    }
    return devDefault;
  }

  return value;
}

export default config;
