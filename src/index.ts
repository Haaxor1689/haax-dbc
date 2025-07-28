#!/usr/bin/env bun

import { join, normalize } from 'path';
import { program } from 'commander';
import { readdir } from 'node:fs/promises';

import { csvToDbc, dbcToCsv } from './converter';

import pkg from '../package.json';

const pad = (v: number, p = 2) => v.toString().padStart(p, '0');
const getTimeElapsed = (startDate: Date, endDate = new Date()) => {
  let ms = endDate.getTime() - startDate.getTime();
  const m = Math.floor(ms / (1000 * 60));
  ms %= 1000 * 60;
  const s = Math.floor(ms / 1000);
  ms %= 1000;
  return `${m ? `${pad(m)}:` : ''}${pad(s)}.${pad(ms, 3)}`;
};

// Set up command-line interface with commander
program
  .name('haax-dbc')
  .description('Convert between DBC and CSV files for World of Warcraft')
  .version(pkg.version)
  .argument('[files...]', 'DBC or CSV files to convert')
  .option('--profile', 'Enable profiling mode', false)
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
const { profile } = program.opts();

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

const start = new Date();
await run(files.map(p => normalize(p)));
console.log(`Done in ${getTimeElapsed(start)}`);

// Memory allocation profiling
if (!profile) process.exit(0);
const { heapStats } = await import('bun:jsc');
const current = heapStats();

const nestedCompare = <
  T extends Record<string, number | Record<string, number>>
>(
  a: T,
  b: T
): T =>
  Object.fromEntries(
    Object.entries(a)
      .map(([k, v]) => {
        if (typeof v === 'object') {
          const r = nestedCompare(v, b[k] as never);
          if (Object.keys(r).length === 0) return undefined;
          return [k, r];
        }
        if (v === b[k]) return undefined;
        const diff = Math.floor((1 - (b[k] as never) / v) * 100);
        if (diff === 0) return undefined;
        return [k, `${v} (${diff}%)`];
      })
      .filter(v => v !== undefined)
  );
const previous = await Bun.file('heap-stats.json')
  .json()
  .catch(() => undefined);
if (previous) console.log(nestedCompare(current, previous));
await Bun.write('heap-stats.json', JSON.stringify(current));
