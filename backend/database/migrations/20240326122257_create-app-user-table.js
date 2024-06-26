import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filename = path.basename(__filename, '.js');

export async function up(knex) {
  const sql = (
    await fs.readFile(path.resolve(__dirname, `./sql/${filename}.up.sql`))
  ).toString();
  await knex.raw(sql);
}

export async function down(knex) {
  const sql = (
    await fs.readFile(path.resolve(__dirname, `./sql/${filename}.down.sql`))
  ).toString();
  await knex.raw(sql);
}
