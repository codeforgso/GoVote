#!/usr/bin/env node

// allow script to be run standalone with arg = manual  using .env parameters in local directory
if (process.argv[2] === 'manual') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const fs = require('fs');
const { Transform } = require('stream');
const request = require('request');
const unzip = require('unzip');
const iconv = require('iconv-lite');
const copyFrom = require('pg-copy-streams').from;
const { Client } = require('pg');

const voterTable = 'voters';
const pollingTable = 'polling_places';

/**
 * Removes null bytes and unprintable characters from a stream
 */
class StreamCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const transformedChunk = chunk
      .toString()
      .replace(/\uFFFD/g, '')
      .replace(/[^\t\r\n -~]+/g, '')
      .replace(/\0/g, '');

    this.push(transformedChunk);
    callback();
  }

  // _flush(callback) {
  //   this.push()
  //   callback()
  // }
}

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

const truncateTable = (tableName) => {
  console.log('Truncating table');
  return client.query(`TRUNCATE TABLE ${tableName};`);
};

const deleteResidentAddressField = () => {
  console.log('Removing resident_address column');
  return client.query(
    `ALTER TABLE ${
      process.env.DB_TABLE
    } DROP COLUMN IF EXISTS resident_address`,
  );
};

const convertToUtf8 = (fileName, utf8FileName) =>
  new Promise((resolve, reject) => {
    const streamCleaner = new StreamCleaner();
    console.log('Converting file to utf8');
    fs.createReadStream(fileName)
      .pipe(iconv.decodeStream('UTF-8'))
      .pipe(streamCleaner)
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

const pgCopyFromCsv = (fileName, tableName) =>
  new Promise((resolve, reject) => {
    console.log('Copying CSV to database');
    const stream = client.query(
      copyFrom(`COPY ${tableName} FROM STDIN with delimiter E'\\t' csv HEADER`),
    );
    const fileStream = fs.createReadStream(fileName);
    fileStream.on('error', (error) => {
      console.log(error);
      reject(error);
    });
    stream.on('error', (error) => {
      console.log(error);
      reject(error);
    });
    fileStream.pipe(stream).on('finish', () => {
      console.log('Copy complete');
      resolve();
    });
  });

const addResidentAddressField = () => {
  return client.query(`ALTER TABLE ${
    process.env.DB_TABLE
  } ADD COLUMN resident_address text;
  UPDATE ${
    process.env.DB_TABLE
  } SET resident_address = regexp_replace(res_street_address, '\\s+', ' ', 'g');`);
};

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

client.connect();
const filePath = `${__dirname}/tmp`; // I.E. ./bin/tmp

const voterETL = async () => {
  const url = process.env.VOTER_URL;
  const fileName = url
    .split('/')
    .pop()
    .split('.')
    .shift(); // assumes the filename includes an extension (voter.zip)
  const extractedFileName = `${fileName}.txt`; // I.E. ncvoter41.txt
  const extractedFileNameUtf8 = `${fileName}utf8.txt`; // I.E. // ncvoter41utf8.txt
  const zipFileName = `${fileName}.zip`; // I.E. ncvoter41.zip

  await downloadFile(url, `${filePath}/${zipFileName}`);
  await unzipFile(`${filePath}/${zipFileName}`, filePath);
  await convertToUtf8(
    `${filePath}/${extractedFileName}`,
    `${filePath}/${extractedFileNameUtf8}`,
  );
  await truncateTable(voterTable);
  await deleteResidentAddressField();
  await pgCopyFromCsv(`${filePath}/${extractedFileNameUtf8}`, voterTable);
  await addResidentAddressField();

  console.log('Deleting Voter ETL files');
  fs.unlinkSync(`${filePath}/${zipFileName}`);
  fs.unlinkSync(`${filePath}/${extractedFileName}`);
  fs.unlinkSync(`${filePath}/${extractedFileNameUtf8}`);
};

const pollingPlaceETL = async () => {
  const url = process.env.POLLING_PLACE_URL;
  const fileName = 'polling_place.csv';
  const fileNameUtf8 = `utf8${fileName}`;

  await downloadFile(url, `${filePath}/${fileName}`);
  await convertToUtf8(`${filePath}/${fileName}`, `${filePath}/${fileNameUtf8}`);
  await truncateTable(pollingTable);
  await pgCopyFromCsv(`${filePath}/${fileNameUtf8}`, pollingTable);
  fs.unlinkSync(`${filePath}/${fileName}`);
  fs.unlinkSync(`${filePath}/${fileNameUtf8}`);
};

(async () => {
  try {
    await voterETL();
    await pollingPlaceETL();
  } catch (e) {
    console.error(e, 'error during etl')
  } finally {
    // await client.end() // Unsure but this doesn't seem to work
    await process.exit()
  }
})()
