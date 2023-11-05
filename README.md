# haax-dbc

CLI utility to convert DBC to and from CSV format.

## Usage

```
haax-dbc <...filePaths>
```

- `...filePaths`: Space-separated list of full paths to dbc or csv files. If a directory path is provided, it will be searched for all dbc files that will be converted to csv.

## Executable

You can also use this CLI as a standalone executable. Run these scripts after cloning to generate it:

```
pnpm i
pnpm run bundle
```

This will create a `haax-dbc` executable in the root of this repository. You can then drag & drop any files you want converted onto the executable.
