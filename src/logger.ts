const pad = (v: number, p = 2) => v.toString().padStart(p, '0');
export const getTimeElapsed = (startDate: Date, endDate = new Date()) => {
  let ms = endDate.getTime() - startDate.getTime();
  const m = Math.floor(ms / (1000 * 60));
  ms %= 1000 * 60;
  const s = Math.floor(ms / 1000);
  ms %= 1000;
  return `${m ? `${pad(m)}:` : ''}${pad(s)}.${pad(ms, 3)}`;
};
