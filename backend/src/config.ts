const config = {
  dbConnectionString: envVar(
    'TASK_BOARD_APP_DATABASE_CONNECTION_STRING',
    'postgresql://postgres:postgres@localhost:5432/task_board_app',
  ),
};

function envVar(name: string, devDefault: string) {
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
