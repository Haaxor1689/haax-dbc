# haax-dbc

CLI utility to convert DBC to and from CSV format.

## Usage

```sh
# Windows executable
.\haax-dbc.exe <...filePaths>

# Unix executable (chmod file once to be executable)
chmod +x haax-dbc
haax-dbc <...filePaths>

# With bun runtime (no manual install needed)
bunx haax-dbc <...filePaths>
```

### Arguments:

- `...filePaths`: Space-separated list of full paths to dbc or csv files. If a directory path is provided, it will be searched for all dbc files that will be converted to csv.

### Examples:

Pass multiple files or directories to convert them all at once.

```
$ haax-dbc path/to/Spell.dbc path/to/Map.dbc
$ haax-dbc path/to/DBFilesClient
```

## Executable

You can also use this CLI as a standalone executable. Download `haax-dbc.exe` for Windows or `haax-dbc` for Linux. You can then drag & drop any files you want converted onto the executable.

## Documentation

Below examples demonstrate how you can use this library in other TS/JS project:

```ts
// Default import for the whole Dbc namespace
import Dbc, {
  // Specific import of singular Dbc schema
  Map,
  // Helpers and type utilities
  type DbcName,
  type DbcEntry,
  isDbc
} from 'haax-dbc';

// Parse specific dbc
export const parseMapDbcBuffer = async (buffer: Uint8Array) => {
  return Map.fromBuffer(buffer);
};

// Parse generic dbc
export const parseDbcBuffer = async <T extends DbcName>(
  name: T,
  buffer: Uint8Array
): Promise<DbcEntry<T>[]> => {
  return Dbc[name].fromBuffer(buffer);
};
```

> Binary data parsing built on top of [@haaxor1689/nil](https://github.com/Haaxor1689/nil) library. For more details, check out documentation there.
