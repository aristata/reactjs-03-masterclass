import instance from "../axios-instance";
import { ICoin } from "./types";

export async function getCoins() {
  const { data } = await instance.get<ICoin[]>(
    "https://api.coinpaprika.com/v1/coins"
  );

  const totalCount = Array.from(data).length;

  const top100Coins = data.slice(0, 100);

  return {
    coins: top100Coins,
    totalCount: totalCount
  };
}
