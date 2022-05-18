import React from "react";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";

interface ChartProps {
  coinId: string;
}

interface ICoinHistory {
  time_open: Date;
  time_close: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = () => {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<ICoinHistory[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  console.log(data ? data[0] : null);
  return <div>Chart</div>;
};

export default Chart;
