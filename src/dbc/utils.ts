import { n } from '@haaxor1689/nil';

import { mapValues } from '../utils';

type StringRef = { _t: 'str'; offset: number };

export const StringRefSchema = n.int32().transform(
  v => ({ _t: 'str', offset: v } as StringRef),
  v => v.offset
);

type StringRefSchema = n.output<typeof StringRefSchema>;

type ToStringRef<T> = {
  [K in keyof T]: T[K] extends StringRefSchema ? string : T[K];
};

const isStringRef = (obj: unknown): obj is StringRefSchema =>
  !!obj && typeof obj === 'object' && '_t' in obj && obj._t === 'str';

export const Position = {
  x: n.float(),
  y: n.float(),
  z: n.float()
};

const Languages = [
  'enUS',
  'enGB',
  'koKR',
  'frFR',
  'deDE',
  'enCN',
  'zhCN',
  'enTW'
] as const;

export const LocalizedStringRef = <T extends string>(key: T) =>
  Object.fromEntries([
    ...Languages.map(l => [`${key}_${l}`, StringRefSchema]),
    [`${key}Mask`, n.int32()]
  ]) as Record<`${T}_${(typeof Languages)[number]}`, typeof StringRefSchema> &
    Record<`${T}Mask`, n.NilNumber>;

type NumbersVariant<
  N extends number,
  Result extends number[] = []
> = Result['length'] extends N
  ? Exclude<Result[number], 0> | N
  : NumbersVariant<N, [...Result, Result['length']]>;

export const ArrayField = <
  T extends string,
  S extends n.NilTypeAny,
  N extends number
>(
  key: T,
  schema: S,
  count: N
) =>
  Object.fromEntries(
    [...Array(count).keys()].map(i => [`${key}_${i + 1}`, schema])
  ) as Record<`${T}_${NumbersVariant<N>}`, S>;

export const DbcSchema = <T extends n.NilRawShape>(schema: T) =>
  n
    .object({
      signature: n.string(4),
      recordCount: n.int32(),
      fieldCount: n.int32(),
      recordSize: n.int32(),
      stringBlockSize: n.int32(),

      records: n.array(n.object(schema), ['recordCount']),

      stringBlock: n.buffer(['stringBlockSize'])
    })
    .transform(
      ({ records, stringBlock }) =>
        records.map(r =>
          mapValues(r, v => {
            if (!isStringRef(v)) return v;
            // Read from string block
            const str = stringBlock.slice(v.offset);
            return new TextDecoder().decode(str.slice(0, str.indexOf(0)));
          })
        ) as ToStringRef<n.objectOutputType<T>>[],
      val => {
        let stringBlock = '\0';
        const records = val.map(r =>
          mapValues(r, v => {
            if (typeof v !== 'string') return v;
            if (!v) return { _type: 'stringRef', offset: 0 };
            const idx = stringBlock.indexOf(`\0${v}\0`);
            if (idx !== -1) return { _type: 'stringRef', offset: idx + 1 };
            const offset = stringBlock.length;
            stringBlock += `${v}\0`;
            return { _type: 'stringRef', offset };
          })
        ) as [];
        const fieldCount = Object.keys(schema).length;
        return {
          signature: 'WDBC',
          recordCount: records.length,
          fieldCount,
          recordSize: fieldCount * 4,
          stringBlockSize: stringBlock.length,
          records,
          stringBlock: new TextEncoder().encode(stringBlock)
        };
      }
    );
