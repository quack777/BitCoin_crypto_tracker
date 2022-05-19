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

  const fixedSecondNum = (num: number) => {
    return num.toFixed(2);
  };

  const chartData = data?.map((dat) => {
    const x = dat.time_close;
    const y = [
      fixedSecondNum(dat.open),
      fixedSecondNum(dat.high),
      fixedSecondNum(dat.low),
      fixedSecondNum(dat.close),
    ];
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
            theme: {
              mode: "dark",
            },
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
              categories: data?.map((price) => price.time_close),
              axisBorder: { show: false },
              axisTicks: { show: false },
              tooltip: { enabled: true },
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
              x: {
                show: true,
                format: "MM/dd",
              },
              enabled: true,
            },
          }}
        />
      )}
    </div>
  );
};

export default Price;
