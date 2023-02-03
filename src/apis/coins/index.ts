import { translateDateFormat } from "../../libs/custom-date";
import instance from "../axios-instance";
import { ICoin, ICoinChart, ICoinInfo, ICoinPrice } from "./types";

export const getCoins = async () => {
  const { data } = await instance.get<ICoin[]>(
    "https://api.coinpaprika.com/v1/coins"
  );

  const totalCount = Array.from(data).length;

  const top100Coins = data.slice(0, 100);

  return {
    coins: top100Coins,
    totalCount: totalCount
  };
};

export const getCoinInfo = async (coinId: string) => {
  const { data } = await instance.get<ICoinInfo>(
    `https://api.coinpaprika.com/v1/coins/${coinId}`
  );

  return data;
};

export const getCoinPrice = async (coinId: string) => {
  const { data } = await instance.get<ICoinPrice>(
    `https://api.coinpaprika.com/v1/tickers/${coinId}`
  );

  return data;
};

export const getCoinPriceHistory = async (
  coinId: string,
  todayDateNumber: number
) => {
  const startDateNumber = todayDateNumber - 1000 * 60 * 60 * 24 * 7 * 2;
  const endDate = translateDateFormat(todayDateNumber);
  const startDate = translateDateFormat(startDateNumber);

  const { data } = await instance.get<ICoinChart[]>(
    `https://api.coinpaprika.com/v1/tickers/${coinId}/historical?start=${startDate}&end=${endDate}&interval=1d`
  );

  return data;
};
