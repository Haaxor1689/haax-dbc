#!/usr/bin/env bun

import { join, normalize } from 'path';
import { program } from 'commander';
import { readdir } from 'node:fs/promises';

import { csvToDbc, dbcToCsv } from './converter';

import pkg from '../package.json';

// Set up command-line interface with commander
program
  .name('haax-dbc')
  .description('Convert between DBC and CSV files for World of Warcraft')
  .version(pkg.version)
  .argument('[files...]', 'DBC or CSV files to convert')
  .addHelpText(
    'after',
    `
You can pass multiple files or directories to convert them all at once.
Examples:
  $ haax-dbc path/to/Spell.dbc path/to/Map.dbc
  $ haax-dbc path/to/DBFilesClient
  `
  )
  .parse();

const files = program.args;

if (files.length === 0) program.help();

const run = async (filePaths: string[]) =>
  Promise.all(
    filePaths.map(async filePath => {
      try {
        const f = Bun.file(filePath);

        if ((await f.stat()).isDirectory()) {
          console.info(`Finding dbc in directory "${filePath}"...`);
          const dirContents = await readdir(filePath);
          await run(
            dirContents
              .filter(p => p.toLocaleLowerCase().endsWith('.dbc'))
              .map(p => join(filePath, p))
          );
          return;
        }

        if (!(await f.exists())) {
          console.warn(`File "${filePath}" not found...`);
          return;
        }

        if (filePath.toLocaleLowerCase().endsWith('.dbc')) {
          console.info(`Converting "${filePath}" to csv...`);
          const csv = await dbcToCsv(filePath);
          csv && (await Bun.write(filePath.slice(0, -4) + '.csv', csv));
          return;
        }

        if (filePath.toLocaleLowerCase().endsWith('.csv')) {
          console.info(`Converting "${filePath}" to dbc...`);
          const dbc = await csvToDbc(filePath);
          dbc && (await Bun.write(filePath.slice(0, -4) + '.dbc', dbc));
          return;
        }

        console.info(`Skipping "${filePath}"...`);
      } catch (err) {
        console.error(
          `Error processing "${filePath}": ${(err as Error).message}`
        );
      }
    })
  );

run(files.map(p => normalize(p)));
