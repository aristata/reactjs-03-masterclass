export const getToday = () => {
  return translateDateFormat(Date.now());
};

export const translateDateFormat = (inputUtcNumber: number) => {
  const d = new Date(inputUtcNumber);
  const month =
    d.getMonth() + 1 > 9 ? `${d.getMonth() + 1}` : `0${d.getMonth() + 1}`;
  const day = d.getDate() > 9 ? `${d.getDate()}` : `0${d.getDate()}`;
  return `${d.getFullYear()}-${month}-${day}`;
};
