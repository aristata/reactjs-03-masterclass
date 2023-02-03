import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCoinPriceHistory } from "../apis/coins";
import { getToday } from "../libs/custom-date";
import { ICoinChart } from "../apis/coins/types";
import ReactApexChart from "react-apexcharts";

interface IOutletContext {
  coinId: string;
}
const Chart = () => {
  const { coinId } = useOutletContext<IOutletContext>();

  const today = getToday();
  const now = Date.now();

  const { isLoading, data } = useQuery<ICoinChart[]>(
    ["coinPriceChart", coinId, today],
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
              mode: "dark"
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
            }
          }}
        />
      )}
    </>
  );
};

export default Chart;
