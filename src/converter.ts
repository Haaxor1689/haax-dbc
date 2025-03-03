import { basename } from 'path';

import Dbc, { isDbc } from './dbc';
import { csvToData, dataToCsv } from './utils';

export const dbcToCsv = async (filePath: string) => {
  const dbcName = basename(filePath, '.dbc');
  if (!isDbc(dbcName)) {
    console.error(`Unknown dbc "${dbcName}"`);
    return null;
  }
  const buffer = await Bun.file(filePath).arrayBuffer();
  const dbc = await Dbc[dbcName].fromBuffer(new Uint8Array(buffer));
  return dataToCsv(dbc);
};

export const csvToDbc = async (filePath: string) => {
  const dbcName = basename(filePath, '.csv');
  if (!isDbc(dbcName)) {
    console.error(`Unknown dbc "${dbcName}"`);
    return null;
  }
  const csv = await Bun.file(filePath).text();
  const data = csvToData(csv);
  return Dbc[dbcName].toBuffer(data as never);
};
