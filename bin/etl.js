#!/usr/bin/env node
/* eslint-disable no-console */

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

const pgCopyFromCsv = fileName => (new Promise((resolve, reject) => {
  console.log('Copying CSV to database');
  const stream = client.query(copyFrom(`COPY ${process.env.DB_TABLE} FROM STDIN with delimiter E'\\t' quote '"' csv HEADER`));
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

const url = 'http://dl.ncsbe.gov/data/ncvoter41.zip';
const fileName = 'ncvoter41'; // This is left as a variable so other groups can easily replace this name with the file name for their county
const extractedFileName = `${fileName}.txt`; // I.E. ncvoter41.txt
const extractedFileNameUtf8 = `${fileName}utf8.txt`; // I.E. // ncvoter41utf8.txt
const zipFileName = `${fileName}.zip`; // I.E. ncvoter41.zip
const filePath = `${__dirname}/tmp`; // I.E. ./bin/tmp

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
client.connect();

(async () => {
  await downloadFile(url, `${filePath}/${zipFileName}`);
  await unzipFile(`${filePath}/${zipFileName}`, filePath);
  await convertToUtf8(`${filePath}/${extractedFileName}`, `${filePath}/${extractedFileNameUtf8}`);
  await truncateTable();
  await deleteResidentAddressField();
  await pgCopyFromCsv(`${filePath}/${extractedFileNameUtf8}`);
  await addResidentAddressField();
  console.log('Deleting files');
  fs.unlinkSync(`${filePath}/${zipFileName}`);
  fs.unlinkSync(`${filePath}/${extractedFileName}`);
  fs.unlinkSync(`${filePath}/${extractedFileNameUtf8}`);
  await client.end();
})()
.then(() => process.exit());
