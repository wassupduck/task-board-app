import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbCACertFile = path.resolve(
  __dirname,
  '../database/rds-ca-cert.eu-west-2-bundle.pem',
);

const frontendUrl = prodEnvVar('FRONTEND_URL', 'http://localhost:5173');

const config = {
  frontendUrl,
  db: {
    connectionString: envVar('DATABASE_CONNECTION_STRING'),
    user: prodEnvVar('DATABASE_USER', 'postgres'),
    database: prodEnvVar('DATABASE_NAME', 'task_board_app'),
    password: envVar('DATABASE_PASSWORD') ?? 'postgres',
    port: Number(envVar('DATABASE_PORT') ?? '5432'),
    host: prodEnvVar('DATABASE_HOST', 'localhost'),
    ssl:
      process.env.NODE_ENV !== 'production'
        ? false
        : { ca: readFileSync(dbCACertFile).toString() },
  },
  jwtOptions: {
    secret: prodEnvVar('JWT_SECRET', 'jwt-secret'),
    expiresIn: envVar('JWT_EXPIRES_IN') ?? '7d',
  },
  corsOptions: {
    origin: frontendUrl,
    credentials: true,
    methods: ['POST'],
  },
};

function prodEnvVar(name: string, devDefault: string): string {
  const value = envVar(name);

  if (value === undefined) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Environment variable: ${name} is not set.`);
    }
    return devDefault;
  }

  return value;
}

function envVar(name: string): string | undefined {
  return process.env[`TASK_BOARD_APP_${name}`];
}

export default config;
