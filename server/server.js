/* eslint no-console: 0 */
const express = require('express');
const { Client } = require('pg');
const Router = require('express-promise-router');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
const router = new Router();

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '../.env' });
}

if (process.env.NODE_ENV === 'production') {
  // Serve entire build folder as static files.
  app.use(express.static(path.resolve(__dirname, '../client/build')));
}

app.set('port', process.env.PORT || 3001);

const client = new Client({ connectionString: process.env.DATABASE_URL });

client.connect(err => {
  if (err) {
    console.error('db connection error', err.stack)
  }
});

router.get('/api/:fn/:ln', async (req, res) => {
  const voterTable = 'voters';
  const pollingTable = 'polling_places';
  const query = `SELECT ${voterTable}.*,
    polling_place_id,
    COALESCE(
      polling_place_name, 'Unable to lookup polling place name'
    ) AS polling_place_name,
    COALESCE(precinct_name, '') AS polling_place_precinct_name,
    COALESCE(house_num, '')     AS polling_place_house_num,
    COALESCE(street_name, '')   AS polling_place_street_name,
    COALESCE(city, '')          AS polling_place_city,
    COALESCE(state, '')         AS polling_place_state,
    COALESCE(zip, '')           AS polling_place_zip
    FROM ${voterTable}
    LEFT OUTER JOIN ${pollingTable}
      ON ${voterTable}.precinct_abbrv = ${pollingTable}.precinct_name
      AND ${voterTable}.county_desc = ${pollingTable}.county_name
    WHERE voter_status_desc NOT LIKE 'REMOVED'
      AND first_name ilike $1::text
      AND last_name ilike $2::text`;
  const { rows } = await client.query(query, [req.params.fn, req.params.ln]);
  res.send(rows);
});

app.use(router);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
