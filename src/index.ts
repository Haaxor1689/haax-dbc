#!/usr/bin/env node

import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

import Logger from './logger';
import { csvToDbc, dbcToCsv } from './converter';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Incorrect number of arguments passed');
  process.exit(1);
}

const run = async (...filePaths: string[]) => {
  for (const filePath of filePaths) {
    if (!existsSync(filePath)) {
      Logger.log(`File "${filePath}" not found...`);
    } else if ((await fs.lstat(filePath)).isDirectory()) {
      Logger.log(`Finding dbc in directory "${filePath}"...`);
      await run(
        ...(await fs.readdir(filePath))
          .filter(p => p.toLocaleLowerCase().endsWith('.dbc'))
          .map(p => path.join(filePath, p))
      );
    } else if (filePath.toLocaleLowerCase().endsWith('.dbc')) {
      Logger.log(`Converting "${filePath}" to csv...`);
      const csv = await dbcToCsv(filePath);
      csv && (await fs.writeFile(filePath.slice(0, -4) + '.csv', csv));
    } else if (filePath.toLocaleLowerCase().endsWith('.csv')) {
      Logger.log(`Converting "${filePath}" to dbc...`);
      const dbc = await csvToDbc(filePath);
      dbc && (await fs.writeFile(filePath.slice(0, -4) + '.dbc', dbc));
    } else {
      Logger.log(`Skipping "${filePath}"...`);
    }
  }
};

run(...args.map(p => path.normalize(p)));
