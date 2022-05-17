export const fetchCoins = async () => {
  const responseData = await (
    await fetch("https://api.coinpaprika.com/v1/coins")
  ).json();
  return responseData.slice(0, 100);
};
