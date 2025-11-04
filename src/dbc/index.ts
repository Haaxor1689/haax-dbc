import n from '@haaxor1689/nil';
import * as Dbc from './schemas';

/**
 * String literal union containing all valid DBC file names.
 */
export type DbcName = keyof typeof Dbc;

/**
 * Type representing a single entry/row from the specified DBC file.
 */
export type DbcEntry<T extends DbcName> = n.output<(typeof Dbc)[T]>[number];

/**
 * Type guard to check if a string is a valid DBC name.
 *
 * @param name - String to check.
 * @returns True if the name is a valid DBC name, false otherwise.
 */
export const isDbc = (name: string): name is DbcName => name in Dbc;

export * from './schemas';
export default Dbc;
