import { n } from '@haaxor1689/nil';

import { mapValues } from '../utils';

type StringRef = { _t: 'str'; offset: number };

export const StringRefSchema: n.NilString = n.int32().transform(
  ctx => ({ _t: 'str', offset: ctx.value } as StringRef),
  ctx => ctx.value.offset
) as never;

const isStringRef = (obj: unknown): obj is StringRef =>
  (obj as any)?._t === 'str';

export const Position = {
  x: n.float(),
  y: n.float(),
  z: n.float()
};

const Languages = [
  'enUS',
  'koKR',
  'frFR',
  'deDE',
  'zhCN',
  'ruRU',
  'esES',
  'ptPT'
] as const;

type StringRefReturn<T extends string> = Record<
  `${T}_${(typeof Languages)[number]}`,
  typeof StringRefSchema
> &
  Record<`${T}Mask`, n.NilNumber>;

export const LocalizedStringRef = <T extends string>(
  key: T
): StringRefReturn<T> =>
  Object.fromEntries([
    ...Languages.map(l => [`${key}_${l}`, StringRefSchema]),
    [`${key}Mask`, n.int32()]
  ]) as never;

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
): Record<`${T}_${NumbersVariant<N>}`, S> =>
  Object.fromEntries(
    [...Array(count).keys()].map(i => [`${key}_${i + 1}`, schema])
  ) as never;

export const DbcSchema = <T extends n.NilRawShape>(
  schema: T
): n.NilArray<n.NilObject<T>> =>
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
      ctx => {
        const { records, stringBlock } = ctx.value;
        const decoder = new TextDecoder();
        for (let i = 0; i < records.length; i++) {
          for (const key in records[i]) {
            if (!records[i].hasOwnProperty(key)) continue;
            const v = records[i][key];
            if (!isStringRef(v)) continue;
            const end = stringBlock.indexOf(0, v.offset);
            (records[i][key] as unknown) = decoder.decode(
              stringBlock.subarray(v.offset, end === -1 ? undefined : end)
            );
          }
        }
        return records;
      },
      ctx => {
        // TODO: Optimize this
        let stringBlock = Buffer.alloc(1);
        const records = ctx.value.map(r =>
          mapValues(r, v => {
            if (typeof v !== 'string') return v;
            if (!v) return { _type: 'stringRef', offset: 0 };
            const searchBuffer = Buffer.from(`\0${v}\0`);
            const idx = stringBlock.indexOf(searchBuffer);
            if (idx !== -1) return { _type: 'stringRef', offset: idx + 1 };
            const offset = stringBlock.length;
            const newString = Buffer.from(`${v}\0`);
            stringBlock = Buffer.concat([stringBlock, newString]);
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
          stringBlock
        };
      }
    ) as never;
