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

export const dataToCsv = (data: Record<string, unknown>[]) => {
  return [
    Object.keys(data[0]),
    ...data.map(r =>
      Object.values(r).map(v =>
        typeof v === 'string'
          ? `"${v.replaceAll('"', '""')}"`
          : typeof v === 'number' && !Number.isInteger(v)
          ? v.toFixed(2)
          : v
      )
    )
  ].join('\n');
};

export const csvToData = (csv: string) => {
  const arr: string[][] = [];
  let quote = false; // 'true' means we're inside a quoted field

  // Iterate over each character, keep track of current row and column (of the returned array)
  for (let row = 0, col = 0, c = 0; c < csv.length; c++) {
    const cc = csv[c],
      nc = csv[c + 1]; // Current character, next character
    if (!arr[row]) arr[row] = []; // Create a new row if necessary
    arr[row]![col] = arr[row]?.[col] ?? ''; // Create a new column (start with empty string) if necessary

    // If the current character is a quotation mark, and we're inside a
    // quoted field, and the next character is also a quotation mark,
    // add a quotation mark to the current column and skip the next character
    if (cc === '"' && quote && nc === '"') {
      arr[row]![col] += cc;
      ++c;
      continue;
    }

    // If it's just one quotation mark, begin/end quoted field
    if (cc === '"') {
      quote = !quote;
      arr[row]![col] += cc;
      continue;
    }

    // If it's a comma and we're not in a quoted field, move on to the next column
    if (cc === ',' && !quote && nc !== '\r' && nc !== '\n') {
      ++col;
      continue;
    }

    // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
    // and move on to the next row and move to column 0 of that new row
    if (cc === '\r' && nc === '\n' && !quote) {
      ++row;
      col = 0;
      ++c;
      continue;
    }

    // If it's a newline (LF or CR) and we're not in a quoted field,
    // move on to the next row and move to column 0 of that new row
    if (cc === '\n' && !quote) {
      ++row;
      col = 0;
      continue;
    }
    if (cc === '\r' && !quote) {
      ++row;
      col = 0;
      continue;
    }

    // Otherwise, append the current character to the current column
    arr[row]![col] += cc;
  }
  const [header, ...rows] = arr;
  return rows.map(r =>
    Object.fromEntries<unknown>(
      r.map((v, i) => [header[i], JSON.parse(v)] as const)
    )
  );
};
