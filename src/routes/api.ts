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
