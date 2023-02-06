import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCoinPriceHistory } from "../apis/coins";
import { getToday } from "../libs/dateTranslator";
import { CoinChart } from "../apis/coins/types";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms/DarkModeAtom";

interface IOutletContext {
  coinId: string;
}
const Chart = () => {
  const { coinId } = useOutletContext<IOutletContext>();
  const isDark = useRecoilValue(isDarkAtom);

  const today = getToday();
  const now = Date.now();

  const { isLoading, data } = useQuery<CoinChart[]>(
    ["coinChart", coinId, today],
    () => getCoinPriceHistory(coinId, now)
  );

  return (
    <>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type={"line"}
          series={[
            {
              name: "price",
              data: data?.map((chartData) => chartData.price) ?? []
            }
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light"
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false
              },
              background: "transparent"
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4
            },
            yaxis: {
              show: false
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              categories:
                data?.map((chartData) => {
                  return chartData.timestamp.split("T").at(0);
                }) ?? []
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881"],
                stops: [0, 100]
              }
            },
            colors: ["#0fbcf9"]
          }}
        />
      )}
    </>
  );
};

export default Chart;
