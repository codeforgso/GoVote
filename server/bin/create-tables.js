#!/usr/bin/env node
/* eslint-disable no-console */
// allow script to be run standalone with arg = manual  using .env parameters in local directory
if (process.argv[2] === 'manual') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const Client = require('pg').Client;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  table: process.env.DB_TABLE,
});

client.connect();

// attempt to drop the table before creating itg
// eslint-disable-next-line quotes
const dropTableQuery = `DROP TABLE IF EXISTS ${process.env.DB_TABLE}`;

client.query(dropTableQuery)
  .then(res => console.log(res))
  .catch(error => console.log('Drop Table error:', error));

const query = `CREATE TABLE ${process.env.DB_TABLE} (
  county_id                TEXT,
  county_desc              TEXT,
  voter_reg_num            TEXT NOT NULL
    CONSTRAINT p_id
    PRIMARY KEY,
  status_cd                TEXT,
  voter_status_desc        TEXT,
  reason_cd                TEXT,
  voter_status_reason_desc TEXT,
  absent_ind               TEXT,
  name_prefix_cd           TEXT,
  last_name                TEXT,
  first_name               TEXT,
  middle_name              TEXT,
  name_suffix_lbl          TEXT,
  res_street_address       TEXT,
  res_city_desc            TEXT,
  state_cd                 TEXT,
  zip_code                 TEXT,
  mail_addr1               TEXT,
  mail_addr2               TEXT,
  mail_addr3               TEXT,
  mail_addr4               TEXT,
  mail_city                TEXT,
  mail_state               TEXT,
  mail_zipcode             TEXT,
  full_phone_number        TEXT,
  race_code                TEXT,
  ethnic_code              TEXT,
  party_cd                 TEXT,
  gender_code              TEXT,
  birth_age                TEXT,
  birth_state              TEXT,
  drivers_lic              TEXT,
  registr_dt               TEXT,
  precinct_abbrv           TEXT,
  precinct_desc            TEXT,
  municipality_abbrv       TEXT,
  municipality_desc        TEXT,
  ward_abbrv               TEXT,
  ward_desc                TEXT,
  cong_dist_abbrv          TEXT,
  super_court_abbrv        TEXT,
  judic_dist_abbrv         TEXT,
  nc_senate_abbrv          TEXT,
  nc_house_abbrv           TEXT,
  county_commiss_abbrv     TEXT,
  county_commis_desc       TEXT,
  township_abbrv           TEXT,
  township_desc            TEXT,
  school_dist_abbrv        TEXT,
  school_dist_desc         TEXT,
  fire_dist_abbrv          TEXT,
  fire_dist_desc           TEXT,
  water_dist_abbrv         TEXT,
  water_dist_desc          TEXT,
  sewer_dist_abbrv         TEXT,
  sewer_dist_desc          TEXT,
  sanit_dist_abbrv         TEXT,
  sanit_dist_desc          TEXT,
  rescue_dist_abbrv        TEXT,
  rescue_dist_desc         TEXT,
  munic_dist_abbrv         TEXT,
  munic_dist_desc          TEXT,
  dist_1_abbrv             TEXT,
  dist_1_desc              TEXT,
  dist_2_abbrv             TEXT,
  dist_2_desc              TEXT,
  confidential_ind         TEXT,
  age                      TEXT,
  ncid                     TEXT,
  vtd_abbrv                TEXT,
  vtd_desc                 TEXT)`;

client.query(query)
  .then(res => console.log(res))
  .catch(error => console.log('Create tables error:', error))
  .then(() => client.end());
