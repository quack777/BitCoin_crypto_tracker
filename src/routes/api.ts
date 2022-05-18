const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchCoins = async () => {
  const responseData = await (await fetch(`${BASE_URL}/coins`)).json();
  return responseData.slice(0, 100);
};

export const fetchCoinInfo = async (coinId: string) => {
  const responseData = await (
    await fetch(`${BASE_URL}/coins/${coinId}`)
  ).json();
  return responseData;
};

export const fetchCoinTickers = async (coinId: string) => {
  const responseData = await (
    await fetch(`${BASE_URL}/tickers/${coinId}`)
  ).json();
  return responseData;
};

export const fetchCoinHistory = async (coinId: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  const responseData = await (
    await fetch(
      `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
    )
  ).json();
  return responseData;
};
