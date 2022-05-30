import React from "react";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTodayPrice } from "./api";

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

const PriceInfoSection = styled.section`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
`;

const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Chart = () => {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinTodayPrice(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const todayData = data ? data[0] : null;

  return (
    <div>
      {isLoading ? (
        "Loading today Price..."
      ) : (
        <PriceInfoSection>
          <PriceBox>
            <p>open</p>
            <p>{todayData?.close}</p>
          </PriceBox>
          <PriceBox>
            <p>current</p>
            <p>{todayData?.open}</p>
          </PriceBox>
          <PriceBox>
            <p>low</p>
            <p>{todayData?.low}</p>
          </PriceBox>
          <PriceBox>
            <p>high</p>
            <p>{todayData?.open}</p>
          </PriceBox>
        </PriceInfoSection>
      )}
    </div>
  );
};

export default Chart;
