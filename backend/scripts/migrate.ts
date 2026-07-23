import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Client } from 'pg';
import { config } from '../src/config.js';

const currentDirectory = path.dirname(
  fileURLToPath(import.meta.url),
);
const migrationPath = path.join(
  currentDirectory,
  '..',
  'migrations',
  '001_create_content.sql',
);
const sql = await readFile(migrationPath, 'utf8');
const client = new Client({
  connectionString: config.databaseUrl,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
await client.query(sql);
await client.end();
console.log('Database migration completed.');
