import * as Dbc from './schemas';

export const isDbc = (file: string): file is keyof typeof Dbc => file in Dbc;
export default Dbc;
