#!/usr/bin/env node
'use strict';
const { Client } = require('pg');
const copyFrom = require('pg-copy-streams').from;
const http = require('http');
const path = require("path");
const fs = require('fs');
const unzip = require('unzip');
const copyTo = require('pg-copy-streams').to;
const { exec } = require('child_process');
const iconv = require('iconv-lite');


// Ensure environment variables are read.
require('../config/env');

if (process.env.NODE_ENV !== 'production') {
  let dotenv = require('dotenv');
  dotenv.config();
}

const the_url = 'http://dl.ncsbe.gov/data/ncvoter41.zip';
const zip_filename = `${__dirname}/tmp/ncvoter41.zip`;
const expected_filename = 'ncvoter41.txt';
const extracted_filename = `${__dirname}/tmp/${expected_filename}`;
const extracted_filename_utf8 = `${extracted_filename}.utf8`;

function delete_file(filename, cb, args = []) {
  if (fs.existsSync(filename)) {
    console.log('Deleting old copy of ' + filename);
    fs.unlinkSync(filename);
    return cb.apply(this, args);
  }
}

function download_zip_file(cb1, args = []) {
  var cb = cb1;
  console.log('Downloading file from ' + the_url);
  http.get(the_url, function(res, err) {
    if (err) { throw(err); }
    let rawData = '';
    let n = 0;
    res.on('data', function(data, err) {
      if (err) { throw(err); }
      if (fs.existsSync(zip_filename)) {
        fs.appendFileSync(zip_filename, data);
      } else {
        fs.writeFileSync(zip_filename, data);
      }
      if (n % 100 === 0) {
        process.stdout.write('.');
      }
      n += 1;
    });
    res.on('end', function(err) {
      process.stdout.write("\n");
      return cb.apply(this, args || []);
    });
  });
}

function unzip_file(cb, args = []) {
  console.log(`Unzipping: ${zip_filename}`);
  fs.createReadStream(zip_filename)
    .pipe(unzip.Extract({ path: `${__dirname}/tmp` }))
    .on('close', function () {
       console.log('Finished unzipping file.');
       return cb.apply(this, args);
     });
}

function iconv_file(cb, args = []) {
  console.log('Apply UTF-8 character set');
  let input = fs.readFileSync(extracted_filename, {encoding: "binary"});
  let output = iconv.decode(input, "UTF-8");
  fs.writeFileSync(extracted_filename_utf8, output);
  return cb.apply(this, args);
}

function init() {
  if (fs.existsSync(zip_filename)) { fs.unlinkSync(zip_filename); }
  download_zip_file(function() {
    if (fs.existsSync(extracted_filename)) fs.unlinkSync(extracted_filename);
    unzip_file(function() {
      if (fs.existsSync(extracted_filename_utf8)) fs.unlinkSync(extracted_filename_utf8);
      iconv_file(function() {
        const client = new Client({
          user: process.env.DB_USER_RWE,
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          password: process.env.DB_PASS_RWE,
          port: process.env.DB_PORT
        });

        client.connect();
        let sql = `TRUNCATE TABLE ${process.env.DB_TABLE}; ` +
                  `ALTER TABLE ${process.env.DB_TABLE} DROP COLUMN IF EXISTS resident_address;`;
        console.log(sql);
        client.query(sql, [], (err, res) => {
          if (err) { throw err; }
          sql = `\\copy ${process.env.DB_TABLE} from '${extracted_filename_utf8}' with delimiter E'\\t' quote '"' csv HEADER;`;
          console.log(sql);
          // we cannot execute the above SQL from this script, but we do something similar below
          const stream = client.query(copyFrom(`COPY ${process.env.DB_TABLE} FROM STDIN with delimiter E'\\t' quote '"' csv HEADER`));
          let fileStream = fs.createReadStream(extracted_filename_utf8);
          fileStream.pipe(stream).on('finish', function() {
            console.log('Finished with COPY SQL command');
            sql = `ALTER TABLE ${process.env.DB_TABLE} ADD COLUMN resident_address text;`;
            console.log(sql);
            client.query(sql, [], (err, res) => {
              if (err) { throw err; }
              sql = `UPDATE ${process.env.DB_TABLE} SET resident_address = regexp_replace(res_street_address, '\\s+', ' ', 'g');`;
              console.log(sql);
              client.query(sql, [], (err, res) => {
                console.log('disconnecting...');
                client.end();
                if (fs.existsSync(extracted_filename_utf8)) fs.unlinkSync(extracted_filename_utf8);
                if (fs.existsSync(extracted_filename)) fs.unlinkSync(extracted_filename);
                if (fs.existsSync(zip_filename)) { fs.unlinkSync(zip_filename); }
                console.log('bye');
              });
            })
          })
        })
      });
    });
  });
}

init();
