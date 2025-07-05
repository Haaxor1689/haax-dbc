import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

export const mapValues = <T, U>(
  obj: Record<string, T>,
  iteratee: (value: T, key: string, obj: Record<string, T>) => U
) => {
  const result: Record<string, U> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = iteratee(obj[key], key, obj);
    }
  }

  return result;
};

export const dataToCsv = (data: Record<string, unknown>[]) =>
  stringify(data, {
    header: true,
    cast: { number: v => (!Number.isInteger(v) ? v.toFixed(2) : v.toString()) }
  });

export const csvToData = (csv: string) =>
  parse(csv, { cast: true, columns: true });
