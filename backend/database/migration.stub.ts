import { Knex } from 'knex';
import * as path from 'path';
import { promises as fs } from 'fs';

const filename = path.basename(__filename, '.ts');

export async function up(knex: Knex): Promise<void> {
  const sql = (
    await fs.readFile(path.resolve(__dirname, `./sql/${filename}.up.sql`))
  ).toString();
  await knex.raw(sql);
}

export async function down(knex: Knex): Promise<void> {
  const sql = (
    await fs.readFile(path.resolve(__dirname, `./sql/${filename}.down.sql`))
  ).toString();
  await knex.raw(sql);
}
