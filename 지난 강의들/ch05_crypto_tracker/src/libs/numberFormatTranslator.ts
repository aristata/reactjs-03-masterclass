export const toUsdCurrency = (input: number) => {
  return input.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    currency: "USD",
    currencyDisplay: "symbol",
    style: "currency"
  });
};

export const toCommaNumber = (input: number) => {
  return input.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    style: "decimal"
  });
};

export const toPercentNumber = (input: number) => {
  return (input * 100).toFixed(2);
};
