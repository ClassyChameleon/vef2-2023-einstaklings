import { query } from './db.js';

export async function updateUserLocation(username, location) {
  const q = `
    UPDATE users
      SET
        location = $1,
        updated = CURRENT_TIMESTAMP
      WHERE
        username = $2;
  `;

  const result = await query(q, [location, username]);

  if (result && result.rowCount === 1) {
    return result.rows[0];
  }

  return null;
}

export async function findByUsername(username) {
  const q = 'SELECT * FROM users WHERE username = $1';

  try {
    const result = await query(q, [username]);

    if (result.rowCount === 1) {
      return result.rows[0];
    }
  } catch (e) {
    console.error('Gat ekki fundið notanda eftir notendnafni');
    return null;
  }

  return false;
}

export async function createUser() {
  // Create a 4 letter code for minimal security
  let userCode = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const length = 4;
  let counter = 0;
  while (counter < length) {
    userCode += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }

  // First query to create user
  const q = `
    INSERT INTO
      users (username)
    VALUES ($1)
    RETURNING *;
  `;
  // Second query to update user so username = id+userCode
  // id is needed for a unique reference to user and
  // usercode is to make sure others don't invade other save files
  const p = `
    UPDATE users
      SET
        username = $1
      WHERE
        id = $2
    RETURNING username;
  `;

  try {
    let result = await query(q, [userCode]);
    const {id} = result.rows[0];
    result = await query(p, [id+userCode, id])
    return result.rows[0];
  } catch (e) {
    console.error('Gat ekki búið til notanda');
  }

  return null;
}