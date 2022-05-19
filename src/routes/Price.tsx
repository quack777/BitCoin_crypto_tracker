import React from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: Date;
  time_close: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Price = () => {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const chartData = data?.map((dat) => {
    const x = dat.time_close;
    const y = [dat.open, dat.high, dat.low, dat.close];
    return { x, y };
  });

  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              data: chartData!,
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            xaxis: {
              type: "datetime",
              labels: { show: false },
              axisBorder: { show: false },
              axisTicks: { show: false },
              tooltip: { enabled: false },
            },
            yaxis: {
              labels: {
                show: false,
              },
              tooltip: {
                enabled: true,
              },
            },
            tooltip: {
              enabled: true,
            },
          }}
        />
      )}
    </div>
  );
};

export default Price;
