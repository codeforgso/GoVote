/* eslint no-console: 0 */
import express from 'express';
import path from 'path';
import pg, { Pool, Client, connect } from 'pg';
import Router from 'express-promise-router';

const app = express();
const router = new Router();

app.set('port', (process.env.PORT || 3001));

// Cedentials for goodtogogsoapi app on Heroku
// const pool = new Pool({
//   user: 'npqbkfgwnhgnoa',
//   host: 'ec2-54-221-220-82.compute-1.amazonaws.com',
//   database: 'd1c7nqcdmofehl',
//   password: '5eb05567b7af2e7fd83f0b2d79a0564a844598776f73aeee906ff32d80476f07',
//   port: 5432,
// });

// const client = new Client({
//   user: 'jason',
//   host: 'localhost:5432',
//   database: 'GuilfordVoters',
//   password: 'pass',
//   port: 5432,
// });

// 'postgres://user:password@server/database'
// var conString = "postgres://npqbkfgwnhgnoa:5eb05567b7af2e7fd83f0b2d79a0564a844598776f73aeee906ff32d80476f07@ec2-54-221-220-82.compute-1.amazonaws.com:5432/d1c7nqcdmofehl"
var conString = "postgres://jason:pass@localhost:5432/GuilfordVoters"
//'postgres://jason:pass@localhost:5432/GuilfordVoters'

var client = new Client(conString);
client.connect();

router.get('/:fn/:ln', async (req, res) => {
  const { rows } = await client.query("SELECT * FROM voters WHERE first_name ilike $1::text and last_name ilike $2::text", [req.params.fn, req.params.ln]);
  res.send(rows);
});

app.use(router);


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
