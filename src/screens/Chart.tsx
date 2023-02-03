import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCoinPriceHistory } from "../apis/coins";
import { getToday } from "../libs/custom-date";

interface IOutletContext {
  coinId: string;
}
const Chart = () => {
  const { coinId } = useOutletContext<IOutletContext>();

  const today = getToday();
  const now = Date.now();

  const { data } = useQuery(["coinPriceChart", coinId, today], () =>
    getCoinPriceHistory(coinId, now)
  );

  return (
    <>
      <h1>차트 화면</h1>
    </>
  );
};

export default Chart;
