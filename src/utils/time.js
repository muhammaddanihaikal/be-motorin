//  rubah waktu ke jakarta/indonesia
export const jakartaIndonesiaTime = (date) => {
  const wib = new Date(date);
  wib.setHours(wib.getHours() + 7);
  return wib;
};

// tanggal sekarang tanpa waktu
export const currentDate = () => {
  const now = jakartaIndonesiaTime(new Date());
  now.setHours(0, 0, 0, 0);
  return now;
};
