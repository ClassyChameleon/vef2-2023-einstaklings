import { readFile } from 'fs/promises';
import pg from 'pg';

// db.js gefur skipanir á database,
// en það getur ekki athugað hvort notandi má framkvæma þessar aðgerðir.
// Middleware sjá um að grípa ef notandi reynir eitthvað sem hann má ekki.

const SCHEMA_FILE = './sql/schema.sql';
const DROP_SCHEMA_FILE = './sql/drop.sql';

const { DATABASE_URL: connectionString, NODE_ENV: nodeEnv = 'development' } =
  process.env;

if (!connectionString) {
  console.error('vantar DATABASE_URL í .env');
  process.exit(-1);
}

// Notum SSL tengingu við gagnagrunn ef við erum *ekki* í development
// mode, á heroku, ekki á local vél
const ssl = nodeEnv === 'production' ? { rejectUnauthorized: false } : false;

const pool = new pg.Pool({ connectionString, ssl });

pool.on('error', (err) => {
  console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
  process.exit(-1);
});

// ============================
//       BASE FUNCTIONALITY
// ============================

export async function query(q, values = []) {
  let client;
  try {
    client = await pool.connect();
  } catch (e) {
    console.error('unable to get client from pool', e);
    return null;
  }

  try {
    const result = await client.query(q, values);
    return result;
  } catch (e) {
    if (nodeEnv !== 'test') {
      console.error('unable to query', e);
    }
    return null;
  } finally {
    client.release();
  }
}

export async function end() {
  await pool.end();
}

export async function createSchema(schemaFile = SCHEMA_FILE) {
  const data = await readFile(schemaFile);

  return query(data.toString('utf-8'));
}

export async function dropSchema(dropFile = DROP_SCHEMA_FILE) {
  const data = await readFile(dropFile);

  return query(data.toString('utf-8'));
}

// ======================
//         ENDINGS
// ======================

// Used when accessing an ending
export async function getEnding(ending) {
  const q = 'SELECT number FROM endings WHERE ending = $1';

  const result = await query(q, [ending]);

  if (result && result.rowCount === 1) {
    return result.rows[0];
  }

  return null;
}

// Don't use if user enters ending without going through the adventure
export async function incrementEnding(ending) {
  const q = 'UPDATE TABLE endings SET number = number + 1 WHERE ending = $1 RETURNING *';

  const result = await query(q, [ending]);

  if (result && result.rowCount === 1) {
    return result.rows[0];
  }

  return null;
}
