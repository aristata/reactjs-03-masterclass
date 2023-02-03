import instance from "../axios-instance";
import { ICoin, ICoinInfo, ICoinPrice } from "./types";

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
