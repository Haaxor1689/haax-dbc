import fs from 'node:fs/promises';
import path from 'node:path';

import Logger, { getTimeElapsed } from './logger';
import Dbc, { isDbc } from './dbc';
import { csvToData, dataToCsv } from './utils';

export const dbcToCsv = async (filePath: string) => {
  const dbcName = path.basename(filePath).slice(0, -4);
  if (!isDbc(dbcName)) {
    Logger.log(`Unknown dbc "${dbcName}"`);
    return null;
  }
  const buffer = await fs.readFile(filePath);
  const dbc = Dbc[dbcName].fromBuffer(new Uint8Array(buffer));
  return dataToCsv(dbc);
};

export const csvToDbc = async (filePath: string) => {
  const dbcName = path.basename(filePath).slice(0, -4);
  if (!isDbc(dbcName)) {
    Logger.log(`Unknown dbc "${dbcName}"`);
    return null;
  }
  const csv = await fs.readFile(filePath, { encoding: 'utf8' });
  const data = csvToData(csv);
  return Dbc[dbcName].toBuffer(data as never);
};
