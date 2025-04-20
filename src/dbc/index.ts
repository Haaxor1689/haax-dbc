import * as Dbc from './schemas';

export type DbcName = keyof typeof Dbc;
export const isDbc = (file: string): file is DbcName => file in Dbc;
export * from './schemas';
export default Dbc;
