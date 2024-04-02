import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seed(knex) {
  const sql = (
    await fs.readFile(path.resolve(__dirname, `./sql/dev.sql`))
  ).toString();
  await knex.raw(sql);
}
