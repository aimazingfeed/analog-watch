export const dateTimeFormat = (date: Date | undefined | "")  => {
  if (!date) return { h: null, m: null, s: null };
  const h = date.getHours().toString();
  const m = date.getMinutes().toString().padStart(2, "0");
  const s = date.getSeconds().toString().padStart(2, "0");
  return { h, m, s };
};

