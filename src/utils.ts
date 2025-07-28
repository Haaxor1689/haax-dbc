import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

export const dataToCsv = (data: Record<string, unknown>[]) =>
  stringify(data, {
    header: true,
    cast: {
      number: v => (!Number.isInteger(v) ? v.toFixed(2) : v.toString()),
      string: v => v.replaceAll(/\n/g, '\\n')
    }
  });

export const csvToData = (csv: string) =>
  parse(csv, { cast: true, columns: true });
