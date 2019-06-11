#!/usr/bin/env node

// allow script to be run standalone with arg = manual  using .env parameters in local directory
if (process.argv[2] === 'manual') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const fs = require('fs');
const request = require('request');
const unzip = require('unzip');
const iconv = require('iconv-lite');
const copyFrom = require('pg-copy-streams').from;
const { Client } = require('pg');

const downloadFile = (url, fileName) =>
  new Promise((resolve, reject) => {
    console.log('Downloading file');
    request(url)
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
        .pipe(fs.createWriteStream(fileName))
        .on('close', () => {
          resolve('success');
        });
  });

const unzipFile = (pathToZip, pathToExtract) =>
 new Promise((resolve, reject) => {
   console.log('Extracting file from zip');
   fs.createReadStream(pathToZip)
      .pipe(unzip.Extract({ path: pathToExtract }))
      .on('error', (error) => {
        console.log(error);
        reject(error);
      })
      .on('close', () => {
        resolve();
      });
 });

const truncateTable = () => {
  console.log('Truncating table');
  return client.query(`TRUNCATE TABLE ${process.env.DB_TABLE};`);
};

const deleteResidentAddressField = () => {
  console.log('Removing resident_address column');
  return client.query(`ALTER TABLE ${process.env.DB_TABLE} DROP COLUMN IF EXISTS resident_address`);
};

const convertToUtf8 = (fileName, utf8FileName) =>
 new Promise((resolve, reject) => {
   console.log('Converting file to utf8');
   fs.createReadStream(fileName)
      .pipe(iconv.decodeStream('UTF-8'))
      .pipe(fs.createWriteStream(utf8FileName))
      .on('error', (error) => {
        console.log(error);
        reject(error);
      })
      .on('finish', () => {
        console.log('File converted to utf8 complete');
        resolve();
      });
 });

const pgCopyFromCsv = (fileName, tableName) => (new Promise((resolve, reject) => {
  console.log('Copying CSV to database');
  const stream = client.query(copyFrom(`COPY ${tableName} FROM STDIN with delimiter E'\\t' quote '"' csv HEADER`));
  const fileStream = fs.createReadStream(fileName);
  fileStream.on('error', (error) => {
    console.log(error);
    reject(error);
  });
  stream.on('error', (error) => {
    console.log(error);
    reject(error);
  });
  fileStream
    .pipe(stream)
    .on('finish', () => {
      console.log('Copy complete');
      resolve();
    });
}));

const addResidentAddressField = () => {
  return client.query(`ALTER TABLE ${process.env.DB_TABLE} ADD COLUMN resident_address text;
  UPDATE ${process.env.DB_TABLE} SET resident_address = regexp_replace(res_street_address, '\\s+', ' ', 'g');`);
};


// const fileName = url.split('/').pop().split('.').shift(); // assumes the filename includes an extension (voter.zip)
// const extractedFileName = `${fileName}.txt`; // I.E. ncvoter41.txt
// const extractedFileNameUtf8 = `${fileName}utf8.txt`; // I.E. // ncvoter41utf8.txt
// const zipFileName = `${fileName}.zip`; // I.E. ncvoter41.zip
// const filePath = `${__dirname}/tmp`; // I.E. ./bin/tmp

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

client.connect();

const filePath = `${__dirname}/tmp`; // I.E. ./bin/tmp
const voterTable = 'voters';
const pollingTable = 'polling_places';

const voterETL = async () => {
  console.log('Start Voter ETL')
  const url = process.env.VOTER_URL;
  const fileName = url.split('/').pop().split('.').shift(); // assumes the filename includes an extension (voter.zip)
  const extractedFileName = `${fileName}.txt`; // I.E. ncvoter41.txt
  const extractedFileNameUtf8 = `${fileName}utf8.txt`; // I.E. // ncvoter41utf8.txt
  const zipFileName = `${fileName}.zip`; // I.E. ncvoter41.zip

  await downloadFile(url, `${filePath}/${zipFileName}`);
  await unzipFile(`${filePath}/${zipFileName}`, filePath);
  await convertToUtf8(`${filePath}/${extractedFileName}`, `${filePath}/${extractedFileNameUtf8}`);
  await truncateTable(voterTable);
  await deleteResidentAddressField();
  await pgCopyFromCsv(`${filePath}/${extractedFileNameUtf8}`, voterTable);
  await addResidentAddressField();

  console.log('Deleting Voter ETL files');
  fs.unlinkSync(`${filePath}/${zipFileName}`);
  fs.unlinkSync(`${filePath}/${extractedFileName}`);
  fs.unlinkSync(`${filePath}/${extractedFileNameUtf8}`);
  console.log('End Voter ETL')
};

const pollingPlaceETL = async () => {
  console.log('Start Polling Place ETL')
  const pollingFileName = process.env.POLLING_PLACE_FILE;
  const fileNameUtf8 = `utf8${pollingFileName}`;
  const localfile = `${__dirname}/${pollingFileName}`;

  await convertToUtf8(`${localfile}`, `${filePath}/${fileNameUtf8}`);
  await truncateTable(pollingTable);
  await pgCopyFromCsv(`${filePath}/${fileNameUtf8}`, pollingTable);

  console.log('Deleting Polling Place ETL files');
  fs.unlinkSync(`${filePath}/${fileNameUtf8}`);
  console.log('End Polling Place ETL')
};

(async () => {
  // await voterETL();
  await pollingPlaceETL();
  await voterETL();
  await client.end();
})()
  .then(() => process.exit());
